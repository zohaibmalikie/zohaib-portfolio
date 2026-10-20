import assert from 'node:assert/strict';

const base = new URL(process.argv[2] || 'http://localhost:3000');
const errors = [];
const pages = new Map();
const assertCheck = (condition, message) => { if (!condition) errors.push(message); };
const decode = (value = '') => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((m) => [m[1].toLowerCase(), decode(m[2] ?? m[3])]));
async function get(path, options) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(45000), ...options });
  return { response, html: await response.text() };
}
function inspect(html) {
  const meta = [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => attrs(m[0]));
  const value = (key) => meta.find((m) => m.name === key || m.property === key)?.content;
  const canonical = [...html.matchAll(/<link\s[^>]*>/gi)].map((m) => attrs(m[0])).find((a) => a.rel === 'canonical')?.href;
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const plain = decode(rendered.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  const headings = [...rendered.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, '')).trim());
  const schemas = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter((m) => attrs(m[1]).type === 'application/ld+json').map((m) => JSON.parse(m[2]));
  return { meta, value, canonical, rendered, plain, headings, schemas };
}
const { response: sitemapResponse, html: sitemap } = await get('/sitemap.xml');
assert.equal(sitemapResponse.status, 200, 'Sitemap must load');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(decode(m[1])));
assert.equal(new Set(urls.map(String)).size, urls.length, 'Sitemap contains duplicate URLs');
const origin = urls[0]?.origin;
assert(origin, 'Sitemap is empty');
async function inspectPage(path, inSitemap = false) {
  if (pages.has(path)) return pages.get(path);
  const { response, html } = await get(path);
  const page = inspect(html);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  const indexable = !page.meta.some((m) => ['robots', 'googlebot'].includes(m.name) && /\bnoindex\b/.test(m.content || ''));
  assertCheck(response.status === 200, `${path}: HTTP ${response.status}`);
  assertCheck(page.headings.length === 1, `${path}: expected one H1`);
  assertCheck(Boolean(title && page.value('description')), `${path}: title/description missing`);
  assertCheck(Boolean(page.canonical), `${path}: canonical missing`);
  assertCheck(Boolean(page.value('og:title') && page.value('og:description') && page.value('og:image') && page.value('twitter:card')), `${path}: social metadata missing`);
  if (inSitemap) {
    assertCheck(indexable, `${path}: sitemap includes noindex page`);
    assertCheck(page.canonical === new URL(path, origin).toString() || page.canonical?.replace(/\/$/, '') === new URL(path, origin).toString().replace(/\/$/, ''), `${path}: sitemap canonical mismatch`);
  }
  for (const m of page.rendered.matchAll(/<img\s[^>]*>/gi)) {
    const image = attrs(m[0]);
    assertCheck('alt' in image, `${path}: image missing alt attribute`);
    assertCheck(Boolean(image.width && image.height), `${path}: image missing intrinsic dimensions`);
  }
  for (const schema of page.schemas) {
    for (const node of schema['@graph'] || [schema]) {
      if (node['@type'] === 'FAQPage') {
        for (const question of node.mainEntity || []) {
          for (const text of [question.name, question.acceptedAnswer?.text]) {
            assertCheck(Boolean(text) && page.plain.includes(text.replace(/\s+/g, ' ')), `${path}: FAQ schema differs from rendered text`);
          }
        }
      }
    }
  }
  const result = { title, description: page.value('description'), canonical: page.canonical, indexable, rendered: page.rendered };
  pages.set(path, result);
  return result;
}
// Bounded concurrency avoids overloading a local production server or CMS.
for (let i = 0; i < urls.length; i += 5) {
  await Promise.all(urls.slice(i, i + 5).map((url) => inspectPage(url.pathname + url.search, true)));
}
const linked = new Set();
const fragments = [];
for (const [path, page] of pages) {
  for (const m of page.rendered.matchAll(/<a\s[^>]*>/gi)) {
    const href = attrs(m[0]).href;
    if (!href) continue;
    const url = new URL(href, new URL(path, origin));
    if (url.origin === origin && url.hash) fragments.push({ source: path, target: url.pathname + url.search, id: decodeURIComponent(url.hash.slice(1)) });
    if (url.origin === origin && url.pathname + url.search !== path && !url.pathname.startsWith('/api/') && !url.pathname.startsWith('/studio')) {
      const destination = url.pathname + url.search;
      linked.add(destination);
      // Archive pages are crawl paths even though only article URLs are in XML.
      // Visiting them here also includes their outgoing links in the graph.
      if (url.pathname === '/blog' && url.searchParams.has('page') && !url.searchParams.has('category') && !url.searchParams.has('tag') && !pages.has(destination)) {
        await inspectPage(destination);
      }
    }
  }
}
const orphans = [...pages.keys()].filter((path) => path !== '/' && !linked.has(path));
assertCheck(orphans.length === 0, `Sitemap pages without an HTML inbound link: ${orphans.join(', ')}`);
for (const path of linked) {
  if (pages.has(path)) continue;
  if (path.startsWith('/blog?') && !new URL(path, origin).searchParams.has('category') && !new URL(path, origin).searchParams.has('tag')) {
    await inspectPage(path);
  } else {
    const { response } = await get(path);
    assertCheck(response.ok, `${path}: broken internal link HTTP ${response.status}`);
  }
}
for (const fragment of fragments) {
  const target = pages.get(fragment.target);
  if (!target) continue;
  const ids = new Set([...target.rendered.matchAll(/\bid="([^"]+)"/g)].map((m) => decode(m[1])));
  assertCheck(ids.has(fragment.id), `${fragment.source}: broken fragment ${fragment.target}#${fragment.id}`);
}
const canonicalPages = [...pages.entries()].filter(([path, p]) => p.indexable && p.canonical?.replace(/\/$/, '') === new URL(path, origin).toString().replace(/\/$/, ''));
for (const field of ['title', 'description']) {
  const values = new Map();
  for (const [path, page] of canonicalPages) {
    assertCheck(!values.has(page[field]), `${path}: duplicate ${field} with ${values.get(page[field])}`);
    values.set(page[field], path);
  }
}
for (const path of ['/blog?page=0', '/blog?page=garbage', '/blog?page=01', '/blog?page=99999', '/blog/not-a-real-article', '/work/not-a-real-project', '/services/not-a-real-service']) {
  const { response, html } = await get(path);
  assertCheck(response.status === 404, `${path}: invalid route should return 404, got ${response.status}`);
  assertCheck(/name="robots" content="[^"]*noindex/.test(html), `${path}: missing noindex for not-found response`);
}
const preview = await get('/', { headers: { cookie: '__prerender_bypass=seo-audit-sentinel' } });
assertCheck(/noindex/.test(preview.response.headers.get('x-robots-tag') || ''), 'Draft-cookie requests must receive noindex');
assertCheck(/no-store/.test(preview.response.headers.get('cache-control') || ''), 'Draft-cookie requests must not be cached publicly');
const studio = await get('/studio');
assertCheck(/noindex/.test(studio.response.headers.get('x-robots-tag') || ''), 'Studio missing noindex response header');
const filtered = inspect((await get('/blog?category=not-a-real-category')).html);
assertCheck(filtered.meta.some((m) => m.name === 'robots' && /noindex/.test(m.content)), 'Filtered blog listing should be noindex');
for (const path of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/humans.txt', '/manifest.webmanifest', '/assets/img/social/site-card.png']) {
  const { response } = await get(path);
  assertCheck(response.ok, `${path}: generated/supporting route unavailable`);
}
const { response: alias } = await get('/work/ledstore-fi-ecommerce-ui-ux', { redirect: 'manual' });
assertCheck(alias.status === 308 && alias.headers.get('location')?.endsWith('/work/ledstore'), 'LedStore legacy redirect changed');
console.log(JSON.stringify({ sitemapPages: urls.length, canonicalPagesIncludingPagination: canonicalPages.length, internalDestinations: linked.size, orphans, errors }, null, 2));
if (errors.length) process.exitCode = 1;
