import React from "react";
import ViewCanvas from "./ViewCanvs";
import Link from "next/link";

const SkillCard = ({
  src,
  header,
  desc,
  index,
  href,
}: {
  src: string;
  header: string;
  desc: string;
  index: number;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="text-primary border-b  cursor-pointer  hover:card hover:border-b-8 duration-300 hover:border-10  min-w-[362px] h-[220px]  sm:h-[268px] flex gap-2 md:gap-4 flex-col"
    >
      <div className="w-[48px] animate-bounce h-[48px]  relative">
        <ViewCanvas index={index} textureUrl={src} />
      </div>
      <h3 className="text-2xl sm:text-2xl md:text-3xl   font-semibold">
        {header}
      </h3>
      <p className="text-lg font-light">{desc}</p>
    </Link>
  );
};

export default SkillCard;
