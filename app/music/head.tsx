export default function Head() {
  return (
    <>
      <title>Music Room — Ovodo</title>
      <meta
        name="description"
        content="See what Ovodo is currently listening to on Spotify — real-time updates."
      />
      <link rel="canonical" href="https://ovd.dev/music" />

      {/* OpenGraph */}
      <meta property="og:title" content="Music Room — Ovodo" />
      <meta
        property="og:description"
        content="See what Ovodo is currently listening to on Spotify — real-time updates."
      />
      <meta property="og:url" content="https://ovd.dev/music" />
      <meta property="og:image" content="https://ovd.dev/og/re-og.webp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Music Room — Ovodo" />
      <meta
        name="twitter:description"
        content="See what Ovodo is currently listening to on Spotify — real-time updates."
      />
      <meta name="twitter:image" content="https://ovd.dev/og/re-og.webp" />
    </>
  );
}
