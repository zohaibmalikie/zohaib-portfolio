import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articles = JSON.parse(await fs.readFile(path.join(root, "content/editorial-articles.json"), "utf8"));
const slugs = new Set();
const keywords = new Set();
let wordCount = 0;
for (const article of articles) {
  assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(!slugs.has(article.slug), `Duplicate slug: ${article.slug}`);
  assert(!keywords.has(article.focusKeyword), `Duplicate primary keyword: ${article.focusKeyword}`);
  slugs.add(article.slug);
  keywords.add(article.focusKeyword);
  assert(article.title.length <= 100, `${article.slug}: title exceeds schema limit`);
  assert(article.excerpt.length <= 220 && article.excerpt.length > 40, `${article.slug}: invalid excerpt`);
  assert(article.category.slug && article.category.title, `${article.slug}: missing category`);
  const words = article.markdown.split(/\s+/).length;
  assert(words >= 350, `${article.slug}: incomplete article (${words} words)`);
  assert((article.markdown.match(/^## /gm) || []).length >= 3, `${article.slug}: missing useful structure`);
  assert(!article.markdown.includes("@@ "), `${article.slug}: manuscript marker leaked`);
  wordCount += words;
  await fs.access(path.join(root, "public/assets/img/blogs/guides", `${article.slug}.svg`));
}
for (const article of articles) {
  for (const match of article.markdown.matchAll(/\]\(\/blog\/([^)?#]+)\)/g)) {
    assert(slugs.has(match[1]), `${article.slug}: broken internal article link ${match[1]}`);
  }
}
console.log(`Validated ${articles.length} articles, unique slugs/keywords, ${wordCount} words, covers, schema limits and internal article links.`);
