import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalPageUrl, canonicalSiteOrigin } from '../lib/url-policy.ts';
import { parseBlogPage } from '../lib/pagination.ts';
import { mergeProjects } from '../lib/project-collections.ts';
import { serializeJsonLd } from '../lib/json-ld.ts';

test('site origin rejects malformed schemes and normalizes deployment configuration', () => {
  const canonical = 'https://www.zohaibramzan.com';
  assert.equal(canonicalSiteOrigin('http://zohaibramzan.com/blog?x=1'), canonical);
  assert.equal(canonicalSiteOrigin('https://www.zohaibramzan.com/'), canonical);
  assert.equal(canonicalSiteOrigin('not a url'), canonical);
  assert.equal(canonicalSiteOrigin('javascript:alert(1)'), canonical);
  assert.equal(canonicalSiteOrigin('http://localhost:3000', true), canonical);
  assert.equal(canonicalSiteOrigin('http://[::1]:3000', true), canonical);
  assert.equal(canonicalSiteOrigin('http://localhost:3000'), 'http://localhost:3000');
});

test('canonicals keep meaningful pagination and remove fragments and trailing slashes', () => {
  const origin = 'https://www.zohaibramzan.com';
  assert.equal(canonicalPageUrl('/blog?page=2#list', origin), origin + '/blog?page=2');
  assert.equal(canonicalPageUrl('http://zohaibramzan.com/work/ledstore/#gallery', origin), origin + '/work/ledstore');
  assert.equal(canonicalPageUrl('https://publisher.example/article/#part', origin), 'https://publisher.example/article');
  assert.throws(() => canonicalPageUrl('data:text/html,test', origin));
});

test('invalid pagination cannot silently create another copy of page one', () => {
  assert.equal(parseBlogPage(), 1);
  assert.equal(parseBlogPage('2'), 2);
  for (const value of ['', '0', '-1', '1.5', '01', '1e2', 'garbage', '9007199254740992']) {
    assert.equal(parseBlogPage(value), null, value);
  }
});

test('JSON-LD escapes script delimiters while preserving the exact parsed value', () => {
  const data = { '@type': 'Question', name: 'Does x < y?', text: '</script><script>alert("test")</script>', unicode: 'Zohaib — SaaS' };
  const serialized = serializeJsonLd(data);
  assert(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
});

test('canonical project wins over its legacy alias regardless of CMS result order', () => {
  const canonical = { _id: 'canonical', title: 'LedStore', slug: 'ledstore', seo: { noIndex: true } };
  const legacy = { _id: 'legacy', title: 'Old title', slug: 'ledstore-fi-ecommerce-ui-ux', seo: { metaTitle: 'A descriptive case study' } };
  const fallback = { _id: 'fallback', title: 'Fallback', slug: 'ledstore', shortDescription: 'Documented context' };
  for (const primary of [[canonical, legacy], [legacy, canonical]]) {
    const merged = mergeProjects(primary, [fallback]);
    assert.equal(merged.length, 1);
    assert.equal(merged[0]._id, 'canonical');
    assert.equal(merged[0].seo.noIndex, true);
    assert.equal(merged[0].seo.metaTitle, 'A descriptive case study');
    assert.equal(merged[0].shortDescription, 'Documented context');
  }
});
