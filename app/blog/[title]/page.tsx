import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "../posts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ title: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title } = await params;
  const post = getPostBySlug(title);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: "Ovodo" }],
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      authors: ["Ovodo"],
      images: [
        {
          url: "https://www.ovd.dev/images/gas2.png", // Replace with your actual image path
          width: 1200,
          height: 630,
          alt: "Ovodo - Full-Stack & Blockchain Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    title: post.slug,
  }));
}

const Page = async ({ params }: Props) => {
  const { title } = await params;
  const post = getPostBySlug(title);

  if (!post) {
    return notFound();
  }

  const Body = post.body;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto mt-12 max-w-[95vw] lg:max-w-[80vw]  bg-card/80 px-6 py-12 shadow-md shadow-black/5 backdrop-blur-sm">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mb-1 text-sm text-muted-foreground">
            {post.date} · {post.category}
          </p>
          {post.tags.length > 0 && (
            <p className="text-xs text-primary/80">
              {post.tags.map((tag) => `#${tag}`).join("  ")}
            </p>
          )}
        </header>

        <div className="prose prose-invert max-w-none prose-headings:mt-8 prose-p:leading-relaxed prose-pre:rounded-xl prose-pre:border prose-pre:border-border/60">
          <Body />
        </div>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ovodo Blog
        </footer>
      </article>
    </main>
  );
};

export default Page;
