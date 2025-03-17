import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["greek"],
  style: ["normal"],
  display: "swap", // Improves font loading performance
});

export const viewport: Viewport = {
  themeColor: "#070d0b",
  viewportFit: "auto",
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "Full-Stack & Blockchain Engineer | Ovodo",
  description:
    "Expert Full-Stack and Blockchain Engineer specializing in web3 development, smart contracts, and modern web applications.",
  keywords:
    "blockchain engineer, full-stack developer, web3, smart contracts, move,solidity,rust,typescript,nextjs",
  authors: [{ name: "Ovodo" }],
  creator: "Ovodo",
  publisher: "Ovodo",
  robots: "index, follow",
  openGraph: {
    title: "Full-Stack & Blockchain Engineer | Ovodo",
    description:
      "Expert Full-Stack and Blockchain Engineer specializing in web3 development, smart contracts, and modern web applications.",
    url: "https://www.ovd.dev", // Replace with your actual domain
    siteName: "Ovodo Portfolio",
    images: [
      {
        url: "https://www.ovd.dev/graph.png", // Replace with your actual image path
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
    images: ["https://www.ovd.dev/graph.png"], // Replace with your actual image path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className} bg-night text-primary px-[20px] sm:px-[40px] md:px-[60px] h-full antialiased`}
      >
        <Navbar />
        <main>
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
