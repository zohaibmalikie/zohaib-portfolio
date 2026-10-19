import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { createClient } from "@sanity/client";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(dirname, "..");
const envPath = path.join(rootDir, ".env");
const defaultInputPath = path.join(rootDir, "content", "articles.example.json");

await loadDotEnv(envPath);

const inputPath = path.resolve(process.argv[2] || process.env.ARTICLES_JSON || defaultInputPath);
const dryRun = process.env.DRY_RUN !== "false";
const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";
const token = process.env.SANITY_WRITE_TOKEN;

if (!dryRun && !token) {
  throw new Error("SANITY_WRITE_TOKEN is required when DRY_RUN=false.");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function loadDotEnv(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");

    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
      process.env[key.trim()] ??= value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function key() {
  return Math.random().toString(36).slice(2, 14);
}

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function inlineSpans(text) {
  const children = [];
  const markDefs = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  function pushText(value, marks = []) {
    if (!value) return;
    children.push({ _key: key(), _type: "span", text: value, marks });
  }

  while ((match = regex.exec(text)) !== null) {
    pushText(text.slice(lastIndex, match.index));

    const token = match[0];
    if (token.startsWith("**")) {
      pushText(token.slice(2, -2), ["strong"]);
    } else if (token.startsWith("*")) {
      pushText(token.slice(1, -1), ["em"]);
    } else if (token.startsWith("`")) {
      pushText(token.slice(1, -1), ["code"]);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const markKey = key();
        markDefs.push({
          _key: markKey,
          _type: "link",
          href: linkMatch[2]
        });
        pushText(linkMatch[1], [markKey]);
      }
    }

    lastIndex = regex.lastIndex;
  }

  pushText(text.slice(lastIndex));

  return {
    children: children.length
      ? children
      : [{ _key: key(), _type: "span", text: text || "", marks: [] }],
    markDefs
  };
}

function textBlock(text, style = "normal", extra = {}) {
  const inline = inlineSpans(text);

  return {
    _key: key(),
    _type: "block",
    style,
    children: inline.children,
    markDefs: inline.markDefs,
    ...extra
  };
}

function markdownToPortableText(markdown) {
  const blocks = [];
  let paragraph = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push(textBlock(paragraph.join(" ")));
    paragraph = [];
  }

  for (const rawLine of String(markdown || "").split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      blocks.push(textBlock(line.replace(/^###\s+/, ""), "h3"));
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push(textBlock(line.replace(/^##\s+/, ""), "h2"));
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      blocks.push(textBlock(line.replace(/^#\s+/, ""), "h2"));
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      blocks.push(textBlock(line.replace(/^>\s+/, ""), "blockquote"));
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      blocks.push(textBlock(line.replace(/^-\s+/, ""), "normal", { listItem: "bullet", level: 1 }));
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      blocks.push(textBlock(line.replace(/^\d+\.\s+/, ""), "normal", { listItem: "number", level: 1 }));
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}

function portableTextPlainText(blocks) {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children.map((child) => child.text || "").join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

function readingTime(blocks) {
  const words = portableTextPlainText(blocks).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function excerptFromBody(blocks, fallback = "") {
  if (fallback.trim()) return fallback.trim();

  const text = portableTextPlainText(blocks).replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 160).replace(/\s+\S*$/, "")}...`;
}

function reference(id) {
  return { _type: "reference", _ref: id };
}

function imageFromAsset(assetId, article) {
  return {
    _type: "image",
    alt: article.imageAlt || article.title,
    caption: article.imageCaption || "",
    creditName: article.imageCreditName,
    creditUrl: article.imageCreditUrl,
    licenseUrl: article.imageLicenseUrl,
    asset: reference(assetId)
  };
}

async function uploadImage(imagePathOrUrl, article, jsonDir) {
  if (!imagePathOrUrl) return null;

  if (article.imageAssetId) return imageFromAsset(article.imageAssetId, article);

  if (dryRun) {
    return {
      _type: "image",
      alt: article.imageAlt || article.title,
      caption: article.imageCaption || "",
    creditName: article.imageCreditName,
    creditUrl: article.imageCreditUrl,
    licenseUrl: article.imageLicenseUrl,
      asset: reference("dry-run-image-asset")
    };
  }

  let body;
  let filename;

  if (/^https?:\/\//i.test(imagePathOrUrl)) {
    const response = await fetch(imagePathOrUrl);
    if (!response.ok) throw new Error(`Failed to download image: ${imagePathOrUrl}`);

    body = Buffer.from(await response.arrayBuffer());
    filename = path.basename(new URL(imagePathOrUrl).pathname) || `${article.slug}.png`;
  } else {
    const resolvedImagePath = path.resolve(jsonDir, imagePathOrUrl);
    body = createReadStream(resolvedImagePath);
    filename = path.basename(resolvedImagePath);
  }

  const asset = await client.assets.upload("image", body, {
    filename,
    title: article.title
  });

  return imageFromAsset(asset._id, article);
}

function validateArticle(article, index) {
  const label = article.title || `article at index ${index}`;
  const required = ["title"];

  for (const field of required) {
    if (!article[field]) throw new Error(`${label}: missing required field "${field}".`);
  }

  if (!article.markdown && !Array.isArray(article.body)) {
    throw new Error(`${label}: provide "markdown" or a Portable Text "body" array.`);
  }

  if (!article.authorId && !process.env.SANITY_DEFAULT_AUTHOR_ID) {
    throw new Error(`${label}: provide "authorId" or SANITY_DEFAULT_AUTHOR_ID.`);
  }

  if (!article.categoryId && !process.env.SANITY_DEFAULT_CATEGORY_ID) {
    throw new Error(`${label}: provide "categoryId" or SANITY_DEFAULT_CATEGORY_ID.`);
  }

  if (!article.image && !article.imageAssetId && !article.mainImageAssetId) {
    throw new Error(`${label}: provide "image", "imageAssetId", or "mainImageAssetId".`);
  }
}

function buildSeo(article, excerpt) {
  const metaTitle = article.seo?.metaTitle || article.seo?.title || article.title;
  const metaDescription =
    article.seo?.metaDescription || article.seo?.description || excerpt;

  return {
    ...article.seo,
    metaTitle,
    metaDescription,
    focusKeyword:
      article.seo?.focusKeyword || article.focusKeyword || article.tags?.[0] || article.title
  };
}

async function buildPostDocument(article, index, jsonDir) {
  validateArticle(article, index);

  const slug = slugify(article.slug || article.title);
  if (!slug) throw new Error(`${article.title}: could not generate a valid slug.`);

  const id = article._id || `post.${slug}`;
  const existing = dryRun ? null : await client.getDocument(id);
  const body = Array.isArray(article.body) ? article.body : markdownToPortableText(article.markdown);
  const excerpt = excerptFromBody(body, article.excerpt || "");
  const mainImage = article.mainImageAssetId
    ? imageFromAsset(article.mainImageAssetId, article)
    : await uploadImage(article.image, { ...article, slug }, jsonDir);

  return {
    _id: id,
    _type: "post",
    title: article.title,
    slug: { _type: "slug", current: slug },
    excerpt,
    mainImage: mainImage || existing?.mainImage,
    author: reference(article.authorId || process.env.SANITY_DEFAULT_AUTHOR_ID),
    category: reference(article.categoryId || process.env.SANITY_DEFAULT_CATEGORY_ID),
    tags: Array.isArray(article.tags) ? article.tags : [],
    publishedAt: article.publishedAt || existing?.publishedAt || new Date().toISOString(),
    updatedAt: article.updatedAt || new Date().toISOString(),
    firstPublishedAt:
      existing?.firstPublishedAt || article.firstPublishedAt || article.publishedAt || new Date().toISOString(),
    readingTime: article.readingTime || readingTime(body),
    featured: Boolean(article.featured),
    body,
    faqs: article.faqs?.map((item, index) => ({ ...item, _type: "object", _key: `faq-${index}` })) || existing?.faqs,
    visualSteps: article.visualSteps?.map((item, index) => ({ ...item, _type: "object", _key: `step-${index}` })) || existing?.visualSteps,
    seo: buildSeo(article, excerpt)
  };
}

async function revalidateImportedPosts(importedDocs) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (dryRun || process.env.REVALIDATE_AFTER_IMPORT !== "true" || !siteUrl || !secret) return;

  for (const doc of importedDocs) {
    const response = await fetch(`${siteUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": secret
      },
      body: JSON.stringify({
        _id: doc._id,
        _type: "post",
        title: doc.title,
        slug: doc.slug.current
      })
    });

    if (!response.ok) {
      console.warn(`Revalidation failed for ${doc.slug.current}: ${response.status}`);
    }
  }
}

async function main() {
  const raw = await fs.readFile(inputPath, "utf8");
  const articles = JSON.parse(raw);
  const jsonDir = path.dirname(inputPath);

  if (!Array.isArray(articles)) {
    throw new Error("Articles JSON must be an array of article objects.");
  }

  console.log(`${dryRun ? "Dry-running" : "Importing"} ${articles.length} article(s) from ${inputPath}`);

  const importedDocs = [];

  for (const [index, article] of articles.entries()) {
    const doc = await buildPostDocument(article, index, jsonDir);

    if (dryRun) {
      console.log(`\n[DRY RUN] ${doc.title}`);
      console.log(JSON.stringify(doc, null, 2));
      continue;
    }

    const result = await client.createOrReplace(doc);
    importedDocs.push(result);
    console.log(`Imported: ${result.title} (${result.slug.current})`);
  }

  await revalidateImportedPosts(importedDocs);
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
