export default function Head() {
  return (
    <>
      <title>Projects — Ovodo</title>
      <meta
        name="description"
        content="A selection of projects I have built — web apps, blockchain integrations, and tools."
      />
      <link rel="canonical" href="https://ovd.dev/projects" />

      {/* OpenGraph */}
      <meta property="og:title" content="Projects — Ovodo" />
      <meta
        property="og:description"
        content="A selection of projects I have built — web apps, blockchain integrations, and tools."
      />
      <meta property="og:url" content="https://ovd.dev/projects" />
      <meta property="og:image" content="https://ovd.dev/og/re-og.webp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects — Ovodo" />
      <meta
        name="twitter:description"
        content="A selection of projects I have built — web apps, blockchain integrations, and tools."
      />
      <meta name="twitter:image" content="https://ovd.dev/og/re-og.webp" />
    </>
  );
}
