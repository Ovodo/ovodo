"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { posts } from "./posts";

const BlogIndexPage = () => {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

    return [...posts]
      .filter((post) => {
        const inTitle = post.title.toLowerCase().includes(q);
        const inCategory = post.category.toLowerCase().includes(q);
        return inTitle || inCategory;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query]);

  return (
    <main className="min-h-screen max-w-[80vw]  mt-5 mx-auto bg-background text-foreground">
      <div className="flex   items-center mb-5 lg:mb-10 justify-end gap-4">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-[220px] text-black/70 rounded-full border border-border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="grid gap-5">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="no-underline"
          >
            <article className="group rounded-2xl border border-border/60 bg-card/80 p-5 shadow-md shadow-black/5 backdrop-blur-sm transition duration-300 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-black/10">
              <h2 className="mb-1 text-xl font-semibold text-foreground group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mb-1 text-[10px] text-muted-foreground">
                {post.date} · {post.category} · {post.readTime}
              </p>
              <p className="mb-2 text-sm text-primary/80  text-muted-foreground">
                {post.summary}
              </p>
              {post.tags.length > 0 && (
                <p className="text-xs text-primary/60">
                  {post.tags.map((tag) => `#${tag}`).join("  ")}
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default BlogIndexPage;
