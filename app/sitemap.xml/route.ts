import { NextResponse } from "next/server";
import { posts } from "@/app/blog/posts";
import { resume } from "@/app/lib/data";

export async function GET() {
    const base = "https://ovd.dev";

    const pages = ["", "blog", "projects", "music", "about"];
    const postUrls = posts.map((p) => `/blog/${p.slug}`);
    const projectUrls = (resume.projects || []).map(
        (pr) => `/projects/${encodeURIComponent(pr.company)}`,
    );

    const urls = [
        ...pages.map((p) => `${base}/${p}`),
        ...postUrls.map((p) => `${base}${p}`),
        ...projectUrls.map((p) => `${base}${p}`),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `
  <url>
    <loc>${url.replace(/\/$/, "")}</loc>
  </url>`
            )
            .join("")}
</urlset>`;

    return new NextResponse(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
