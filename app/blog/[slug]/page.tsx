import { getAllPosts, getPostSource } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { source, meta } = getPostSource(slug);

  const { content } = await compileMDX({
    source,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return (
    <main>
      <Link className="breadcrumb" href="/">
        ← 返回首页
      </Link>

      <h1 className="post-title">{meta.title}</h1>
      <div className="post-date">{meta.date}</div>

      <article className="prose">{content}</article>
    </main>
  );
}
