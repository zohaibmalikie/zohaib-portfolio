import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articles = JSON.parse(await fs.readFile(path.join(root, "content/editorial-articles.json"), "utf8"));
const enrichment = JSON.parse(await fs.readFile(path.join(root, "content/blog-enrichment.json"), "utf8"));
const categoryIds = JSON.parse(process.env.EDITORIAL_CATEGORY_IDS || "{}");
const output = process.argv[2] || path.join(await fs.mkdtemp(path.join(os.tmpdir(), "portfolio-posts-")), "articles.json");
await fs.writeFile(output, `${JSON.stringify(articles.map((article) => ({
  ...article,
  ...enrichment[article.slug],
  _id: `editorial-${article.slug}`,
  category: undefined,
  categoryId: categoryIds[article.category.slug] || process.env.SANITY_DEFAULT_CATEGORY_ID,
  image: path.resolve(root, "content", article.image),
  seo: { metaTitle: article.title, metaDescription: article.excerpt, focusKeyword: article.focusKeyword }
})), null, 2)}\n`);
console.log(`Exported ${articles.length} articles to ${output}. Use the existing importer in dry-run mode first.`);
