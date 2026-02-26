import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["normal"],
  display: "optional", // Eliminates render-blocking; uses fallback if font not cached
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#070d0b",
  viewportFit: "auto",
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ovd.dev"),
  title: "Full-Stack & Blockchain Engineer | Ovodo",
  description:
    "Expert Full-Stack and Blockchain Engineer specializing in web3 development, smart contracts, and modern web applications.",
  keywords:
    "blockchain engineer, full-stack developer, web3, smart contracts, move,solidity,rust,typescript,nextjs",
  authors: [{ name: "Ovodo" }],
  creator: "Ovodo",
  publisher: "Ovodo",
  robots: "index, follow",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  openGraph: {
    title: "Full-Stack & Blockchain Engineer | Ovodo",
    description:
      "Expert Full-Stack and Blockchain Engineer specializing in web3 development, smart contracts, and modern web applications.",
    url: "https://ovd.dev", // Replace with your actual domain
    siteName: "Ovodo Portfolio",
    images: [
      {
        url: "https://ovd.dev/og/re-og.webp",
        width: 1200,
        height: 630,
        alt: "Ovodo - Full-Stack & Blockchain Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack & Blockchain Engineer | Ovodo",
    description:
      "Expert Full-Stack and Blockchain Engineer specializing in web3 development, smart contracts, and modern web applications.",
    images: ["https://ovd.dev/og/re-og.webp"], // Prefer generated OG image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ovodo",
    url: "https://ovd.dev",
    sameAs: ["https://github.com/ovodo", "https://twitter.com/ovdizzle"],
  };

  return (
    <html lang="en">
      <body
        className={`${ubuntu.className} bg-[var(--background)] text-[var(--text)] px-[20px] sm:px-[40px] md:px-[60px] overflow-x-hidden scrollbar-hide md:pl-[96px] min-h-screen antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>
          {/* SmoothScrollWrapper provides lerp scrolling for the whole app */}
          <SmoothScrollWrapper>
            {children}
            <Analytics />
            <SpeedInsights />
          </SmoothScrollWrapper>
        </main>
      </body>
    </html>
  );
}
