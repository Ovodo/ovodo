"use client";
import Link from "next/link";

const Contact = () => {
  const handleContactClick = () => {
    // const whatsappUrl = "https://wa.me/2349067885409";
    const telegramUrl = "https://t.me/ovdizzle";

    // Change the preferred contact method
    // window.open(whatsappUrl, "_blank");
    window.open(telegramUrl, "_blank"); // Uncomment if you prefer Telegram
  };

  return (
    <div className="flex flex-col gap-5 lg:gap-10 items-center py-[10vh] mb-[15vh] justify-center">
      <div className="flex flex-col gap-4 sm:gap-8 w-full items-center md:items-center justify-between">
        <h1 className="text-primary text-[32px] sm:text-[48px] lg:max-w-[500px] text-center md:text-[56px] leading-[1.1] sm:leading-none font-bold">
          Let&apos;s Connect Explore My Work
        </h1>
        <p className="text-primary text-sm sm:text-[16px] text-center md:text-[20px] leading-tight font-light max-w-[820px]">
          Discover innovative solutions and creative projects that showcase my
          skills and passion for technology.
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        <button
          onClick={handleContactClick}
          className="text-night p-4 hover:scale-105 active:scale-95 duration-150 bg-primary rounded-[4px]"
        >
          Contact
        </button>
        <Link
          href={"/projects"}
          className="text-primary p-4 bg-transparent duration-150 hover:scale-105 active:scale-95 border-primary border rounded-[4px]"
        >
          Portfolio
        </Link>
      </div>
    </div>
  );
};

export default Contact;
