export default function Head() {
  return (
    <>
      <title>Blog — Ovodo</title>
      <meta
        name="description"
        content="Curated deep-dives on systems, chains, and resilient product development."
      />
      <link rel="canonical" href="https://ovd.dev/blog" />
      <link
        rel="alternate"
        type="application/rss+xml"
        href="/rss.xml"
        title="Ovodo Blog RSS"
      />

      {/* OpenGraph */}
      <meta property="og:title" content="Blog — Ovodo" />
      <meta
        property="og:description"
        content="Curated deep-dives on systems, chains, and resilient product development."
      />
      <meta property="og:url" content="https://ovd.dev/blog" />
      <meta property="og:image" content="https://ovd.dev/og/re-og.webp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Blog — Ovodo" />
      <meta
        name="twitter:description"
        content="Curated deep-dives on systems, chains, and resilient product development."
      />
      <meta name="twitter:image" content="https://ovd.dev/og/re-og.webp" />
    </>
  );
}
