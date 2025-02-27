import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["greek"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Ovodo",
  description: "Get to know more about Ovodo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='bg-white' lang='en'>
      <body className={`${ubuntu.className}  text-primary   antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
