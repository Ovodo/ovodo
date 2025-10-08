"use client";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center gap-20 py-16"
      id="about"
    >
      <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-primary shadow-lg">
        <Image
          src="/ovdizzle.jpeg"
          alt="Ovodo Ohwovoriole"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-6 max-w-2xl">
        <h2 className="text-primary text-3xl font-bold">About Me</h2>
        <h3 className="text-lg font-semibold text-primary/80 -mt-2 mb-1">
          Delivering Secure, Scalable Blockchain Solutions
        </h3>
        <p className="text-primary text-base md:text-lg font-light">
          I am a passionate Full Stack & Blockchain Developer with 5+ years of
          experience building scalable web applications and decentralized
          solutions. My expertise spans smart contract development (Solidity,
          Move, Rust), DApp architecture, and modern full stack frameworks
          (Next.js, Node.js, Python, TypeScript).
        </p>
        <p className="text-primary text-base md:text-lg font-light">
          I have contributed to open source blockchain projects (Solana
          Foundation), led teams to deliver DeFi, NFT, and Web3 products, and
          thrive on solving complex problems at the intersection of technology
          and finance.
        </p>
        <div className="bg-primary/10 p-4 rounded-md">
          <h3 className="text-primary font-semibold mb-1">Why hire me?</h3>
          <ul className="list-disc pl-5 text-primary text-base font-light">
            <li>Proven track record in blockchain and full stack delivery</li>
            <li>Strong problem-solving and leadership skills</li>
            <li>
              Up-to-date with the latest in Web3, DeFi, and smart contract
              security
            </li>
            <li>Excellent communication and remote collaboration abilities</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <span className="font-bold text-primary/90 text-base">
            Open to Full Stack Blockchain Developer roles (remote or on-site)
          </span>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/ovodo.pdf"
              target="_blank"
              download={false}
              className="text-night bg-primary px-4 py-2 rounded hover:scale-105 duration-150 font-semibold shadow-lg border-2 border-primary"
            >
              Download CV
            </Link>
            <a
              href="mailto:ohwovoriole@gmail.com"
              className="text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-night duration-150 font-semibold"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/ovodo"
              target="_blank"
              className="text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-night duration-150 font-semibold"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ovodo"
              target="_blank"
              className="text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-night duration-150 font-semibold"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
