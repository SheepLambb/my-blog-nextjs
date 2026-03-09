import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // yyyy-mm-dd
  description?: string;
  type?: "project" | "blog" | "resume";
  image?: string;
  tags?: string[];
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "1970-01-01"),
      description: data.description ? String(data.description) : undefined,
      type: data.type as "project" | "blog" | "resume" | undefined,
      image: data.image ? String(data.image) : undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
    } satisfies PostMeta;
  });

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostSource(slug: string): { source: string; meta: PostMeta } {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    description: data.description ? String(data.description) : undefined,
    type: data.type as "project" | "blog" | "resume" | undefined,
    image: data.image ? String(data.image) : undefined,
    tags: Array.isArray(data.tags) ? data.tags : [],
  };

  return { source: content, meta };
}
