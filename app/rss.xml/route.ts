import { posts } from "@/app/blog/posts";
import { NextResponse } from "next/server";

const SITE_URL = "https://ovd.dev";

function buildItem(post: any) {
    const url = `${SITE_URL}/blog/${post.slug}`;
    return `  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.summary}]]></description>
  </item>`;
}

export async function GET() {
    const header = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n<channel>\n  <title>Ovodo Blog</title>\n  <link>${SITE_URL}</link>\n  <description>Latest posts from Ovodo</description>\n  <language>en-us</language>`;

    const items = posts
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map(buildItem)
        .join("\n");

    const xml = `${header}\n${items}\n</channel>\n</rss>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
