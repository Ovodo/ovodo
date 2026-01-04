"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { posts } from "./posts";
import SubscribeInline from "@/components/SubscribeInline";

const BlogIndexPage = () => {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return [...posts]
      .filter((post) => {
        return (
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query]);

  return (
    <main className="relative isolate min-h-screen mx-auto pb-20 pt-14">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-2 top-0 h-72 w-72 rounded-full bg-accent/16 blur-[140px]" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-primary/12 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,212,0,0.06),transparent_38%),radial-gradient(circle_at_78%_28%,rgba(230,230,230,0.04),transparent_40%),linear-gradient(130deg,rgba(255,212,0,0.04),rgba(14,121,178,0.025),rgba(99,187,147,0.035))] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.4)_95%)]" />
      </div>

      <header className="mb-10 space-y-6 text-left lg:mb-14">
        <p className="text-xs uppercase tracking-[0.32em] text-accent/80">
          Blog / Insight Drops
        </p>
        <div className="space-y-4">
          {/* <h1 className="text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl">
            Precision-grade essays for builders & investors.
          </h1> */}
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            Curated deep-dives on systems, chains, and shipping resilient
            products. Filter by category or search topics; everything is
            chronologically sorted and intentionally concise.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <SubscribeInline />
          <p className="text-xs text-muted-foreground">
            One-click subscribe; no spam, just new posts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/5 bg-black/50 p-3 shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="relative flex-1 min-w-[240px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-accent/70">
              <span className="text-xs font-semibold">⌕</span>
            </div>
            <input
              type="text"
              placeholder="Search by title, tag, or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-9 py-3 text-sm text-primary/90 placeholder:text-muted-foreground/70 outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                !activeCategory
                  ? "bg-accent text-night"
                  : "border border-white/10 bg-white/5 text-primary/80 hover:border-accent/40"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory((prev) =>
                    prev === category ? null : category
                  )
                }
                className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-accent text-night"
                    : "border border-white/10 bg-white/5 text-primary/80 hover:border-accent/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div> */}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredPosts.map((post, index) => {
          const topAccent = index < 2;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl transition hover:no-underline duration-300 hover:-translate-y-1 hover:border-accent/30 h-[300px] lg:h-[250px] hover:shadow-[0_28px_90px_rgba(0,0,0,0.45)]"
            >
              <div className="relative flex h-full flex-col gap-3 rounded-2xl bg-gradient-to-br from-white/6 via-white/3 to-white/0 px-5 py-6">
                {topAccent && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-[11px] font-semibold text-night shadow-[0_8px_30px_rgba(255,212,0,0.28)]">
                    Featured
                  </span>
                )}

                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground/80">
                  {/* <span>{post.category}</span>
                  <span className="text-primary/30">•</span> */}
                  <span>{post.date}</span>
                  <span className="text-primary/30">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-semibold text-primary transition group-hover:text-accent sm:text-2xl">
                  {post.title}
                </h2>

                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-primary/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,212,0,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_25%)]" />
              </div>
            </Link>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center text-muted-foreground">
            Nothing matches that query yet. Try another keyword or category.
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogIndexPage;
