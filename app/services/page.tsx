import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const metadata: Metadata = {
  title: "Services — Ovodo",
  description:
    "Full-stack, blockchain, mobile and bot development services by Ovodo — detailed breakdown of tools, paradigms, and deliverables.",
  alternates: { canonical: "https://ovd.dev/services" },
  openGraph: {
    title: "Services — Ovodo",
    description:
      "Full-stack, blockchain, mobile and bot development services by Ovodo.",
    url: "https://ovd.dev/services",
    images: [
      { url: "https://ovd.dev/og/re-og.webp", width: 1200, height: 630 },
    ],
  },
};

export default function Page() {
  return <ServicesPage />;
}
