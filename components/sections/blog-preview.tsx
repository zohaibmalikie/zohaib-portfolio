import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SanityImage } from "@/components/sanity-image";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatDate, getReadingTime } from "@/lib/content-utils";
import type { Post } from "@/types/sanity";

export function BlogPreview({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  const [featuredPost, ...restPosts] = posts;

  return (
    <section id="blog" className="section section-dark">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title={
              <>
                Writing &amp;<br />
                <span className="text-accent">Thinking</span>
              </>
            }
          >
            <ActionLink href="/blog" variant="ghost">
              All Posts <ArrowUpRight size={15} aria-hidden="true" />
            </ActionLink>
          </SectionHeading>
        </Reveal>
        <Reveal className="featured-post">
          <Link href={`/blog/${featuredPost.slug}`} className="featured-post-link">
            <div className="featured-post-image">
              <SanityImage
                image={featuredPost.mainImage}
                width={900}
                height={560}
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <span>Featured</span>
            </div>
            <div className="featured-post-body">
              <p className="eyebrow">{featuredPost.category?.title || "Article"}</p>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.excerpt}</p>
              <div className="meta-row">
                <span>
                  <Calendar size={15} aria-hidden="true" /> {formatDate(featuredPost.publishedAt)}
                </span>
                <span>
                  <Clock size={15} aria-hidden="true" /> {getReadingTime(featuredPost)} min read
                </span>
              </div>
              <span className="round-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
        </Reveal>
        {restPosts.length ? (
          <Stagger className="post-grid">
            {restPosts.slice(0, 3).map((post) => (
              <StaggerItem key={post._id}>
                <Link href={`/blog/${post.slug}`} className="post-card">
                  <SanityImage
                    image={post.mainImage}
                    width={700}
                    height={440}
                    className="card-image"
                    sizes="(max-width: 900px) 100vw, 31vw"
                  />
                  <div className="card-body">
                    <span className="tag">{post.category?.title || post.tags?.[0] || "Article"}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="meta-row">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{getReadingTime(post)} min read</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </Container>
    </section>
  );
}
