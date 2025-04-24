"use client";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col gap-8 items-center py-[10vh] lg:mb-[15vh] justify-center"
    >
      <div className="flex flex-col gap-4 sm:gap-8 w-full items-center justify-between">
        <h1 className="text-primary text-[32px] sm:text-[48px] text-center md:text-[56px] leading-[1.1] font-bold">
          Let&apos;s Connect
        </h1>
        <p className="text-primary text-base sm:text-lg text-center md:text-xl leading-tight font-light max-w-[700px]">
          Interested in collaborating, hiring, or just want to chat about
          blockchain and full stack development? Reach out and let’s build
          something amazing together!
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <a
          href="mailto:ohwovoriole@gmail.com"
          className="flex items-center gap-2 text-night bg-primary px-5 py-3 rounded-lg font-semibold text-lg shadow hover:scale-105 duration-150"
        >
          <IconMail size={22} /> Email
        </a>
        <a
          href="https://linkedin.com/in/ovodo"
          target="_blank"
          className="flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-night duration-150"
        >
          <IconBrandLinkedin size={22} /> LinkedIn
        </a>
        <a
          href="https://github.com/ovodo"
          target="_blank"
          className="flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-night duration-150"
        >
          <IconBrandGithub size={22} /> GitHub
        </a>
        <a
          href="https://t.me/ovdizzle"
          target="_blank"
          className="flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-night duration-150"
        >
          <IconBrandTelegram size={22} /> Telegram
        </a>
      </div>
    </motion.div>
  );
};

export default Contact;
