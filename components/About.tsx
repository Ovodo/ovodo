"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [imageVisible, setImageVisible] = useState(false);
  const [bulletPoints, setBulletPoints] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.55,
      rootMargin: "0px",
    };

    const img = imageRef.current;
    const bullets = bulletsRef.current;
    const buttons = buttonsRef.current;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageVisible(true);
          } else {
            setImageVisible(false);
          }
        });
      },
      { threshold: 0.5 },
    );

    const bulletsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger the bullet points
          bulletPoints.forEach((_, index) => {
            setTimeout(() => {
              setBulletPoints((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150);
          });
        } else {
          setBulletPoints([false, false, false, false]);
        }
      });
    }, observerOptions);

    const buttonsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setButtonsVisible(true), 200);
          } else {
            setButtonsVisible(false);
          }
        });
      },
      { threshold: 0.6 },
    );

    if (img) imageObserver.observe(img);
    if (bullets) bulletsObserver.observe(bullets);
    if (buttons) buttonsObserver.observe(buttons);

    return () => {
      if (img) imageObserver.unobserve(img);
      if (bullets) bulletsObserver.unobserve(bullets);
      if (buttons) buttonsObserver.unobserve(buttons);
    };
  }, [bulletPoints]);

  return (
    <div
      className="flex overflow-x-hidden flex-col md:flex-row items-center  gap-20 py-16"
      id="about"
    >
      <div
        ref={imageRef}
        className={`relative w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-primary shadow-lg transition-transform duration-700 ease-out ${
          imageVisible ? "scale-100" : "scale-0"
        }`}
      >
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
        {/* <p className="text-primary text-base md:text-lg font-light">
          I have contributed to open source blockchain projects (Solana
          Foundation), led teams to deliver DeFi, NFT, and Web3 products, and
          thrive on solving complex problems at the intersection of technology
          and finance.
        </p> */}
        <div ref={bulletsRef} className="bg-primary/10 p-4 rounded-md">
          <h3 className="text-primary font-semibold mb-1">Why hire me?</h3>
          <ul className="list-disc pl-5 text-primary text-base font-light">
            <li
              className={`transition-opacity duration-500 ${
                bulletPoints[0] ? "opacity-100" : "opacity-0"
              }`}
            >
              Proven track record in blockchain and full stack delivery
            </li>
            <li
              className={`transition-opacity duration-500 ${
                bulletPoints[1] ? "opacity-100" : "opacity-0"
              }`}
            >
              Strong problem-solving and leadership skills
            </li>
            <li
              className={`transition-opacity duration-500 ${
                bulletPoints[2] ? "opacity-100" : "opacity-0"
              }`}
            >
              Up-to-date with the latest in Web3, DeFi, and smart contract
              security
            </li>
            <li
              className={`transition-opacity duration-500 ${
                bulletPoints[3] ? "opacity-100" : "opacity-0"
              }`}
            >
              Excellent communication and remote collaboration abilities
            </li>
          </ul>
        </div>
        <div className="bg-primary/5 p-4 rounded-md">
          <h3 className="text-primary font-semibold mb-2">Available for</h3>
          <ul className="list-disc pl-5 text-primary text-base font-light">
            <li>Smart contract architecture & audits</li>
            <li>Web3 platform builds (DeFi, exchanges, marketplaces)</li>
            <li>AI agent integrations & RAG architectures</li>
            <li>Token systems & on-chain accounting</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <span className="font-bold text-primary/90 text-base">
            Open to Full Stack Blockchain Developer roles (remote or on-site)
          </span>
          <div
            ref={buttonsRef}
            className={`flex gap-4 flex-wrap transition-all duration-700 ease-out ${
              buttonsVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <a
              href="https://calendly.com/ovodo/30min"
              target="_blank"
              rel="noreferrer"
              className="block w-full sm:w-auto text-center text-night bg-primary px-4 py-2 rounded hover:scale-105 duration-150 font-semibold shadow-lg border-2 border-primary"
            >
              Book
            </a>
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
