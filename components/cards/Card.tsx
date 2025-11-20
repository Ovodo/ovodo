"use client";

import React from "react";
import { motion } from "framer-motion";
import Playlist from "./Playlist";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { IconGardenCart, IconPlayerPlay } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const variants = {
  rotate: { rotate: 0, x: 0 },
  done: { rotate: 360, x: 30 },
  left: { x: -30 },
};

interface CardProps {
  pack: {
    packname: string;
    imagename: string;
    title?: string;
    clefs?: number;
    artiste?: string;
    url?: string;
  };
}

const Card: React.FC<CardProps> = ({ pack }) => {
  const { packname, imagename, title, clefs, artiste, url } = pack;
  const router = useRouter();

  return (
    <div
      style={{
        width: 200,
        height: 216,
        scale: "100%",
        boxShadow: "-5px -5px 15px rgba(0, 0, 0, 0.05)",
      }}
      className="flex flex-col mt-2 mr-2 overflow-hidden border-[1.5px] border-slate-900 rounded-t-md"
    >
      <motion.div
        initial={{ x: 100 }}
        whileHover={{ x: [100, 0] }}
        transition={{ type: "spring" }}
        id="Card"
        className="relative rounded-t-md"
        onClick={() => {
          router.push("/sounds/packs/item");
        }}
        style={{
          width: "100%",
          height: "60%",
          background: `url(/assets/images/${imagename})`,
          backgroundSize: "cover",
        }}
      >
        <motion.div
          initial="rotate"
          whileHover="done"
          animate="rotate"
          className="cart flex justify-around scale-0 relative left-[100%] font-semibold hover:bg-slate-700 cursor-pointer transition duration-200 hover:text-slate-300 h-5 w-full text-slate-700 bg-slate-300  translate-y-[-20px] text-center"
        >
          <motion.div>
            <IconCheck
              size={"5px"}
              stroke={5}
              className="absolute  bottom-[45%] right-[15%]"
            />
          </motion.div>
          <motion.i variants={variants} className="relative right-5">
            <IconGardenCart size={"18px"} />
          </motion.i>
          <motion.p
            variants={{ rotate: { x: 0 }, done: { x: -40 } }}
            className="text-slate-50 opacity-75 flex flex-col items-center text-[6px] absolute bottom-0 right-1"
          >
            Add to cart
          </motion.p>
        </motion.div>
      </motion.div>
      <div className="details_card px-1  flex flex-col mt-2 overflow-hidden border-opacity-20 border-x-slate-700 border-x-[1px] p-0  mx-1">
        <div className="relative">
          <span
            onClick={() => {}}
            className="font-[600] text-[13px] inline-block text-primary"
          >
            <Link
              href={"/sounds/packs/[name]"}
              as={`/sounds/packs/${packname}`}
            >
              {packname}
            </Link>
          </span>
          <p className="clef absolute bottom-36  right-0 font-bold rounded-[50%]  hover:bg-slate-300 cursor-pointer transition ease-out duration-75 hover:text-slate-700 h-8 w-8 center text-myBrown ">
            {/* + {clefs} */}
          </p>
        </div>
        <span
          style={{ color: "var(--lemon)" }}
          className="text-myBrown mt-[-2px]  opacity-90"
        >
          {artiste || "Ovd"}
        </span>
      </div>
      <motion.div className="playlist_div  ml-1">
        <Playlist />
      </motion.div>
    </div>
  );
};

export default Card;
