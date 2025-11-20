import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ovd ",
  description: "A platform for music producers, sample packs, and beats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
