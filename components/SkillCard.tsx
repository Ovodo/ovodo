import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ViewCanvas = dynamic(() => import("./ViewCanvs"), {
  ssr: false,
  loading: () => <div className="w-[48px] h-[48px]" />,
});

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
      className="text-primary border-b  cursor-pointer  hover:card hover:border-b-4 duration-300 hover:border-10 w-[90vw] lg:w-[25vw]  h-[220px]  sm:h-auto flex gap-2 md:gap-4 flex-col"
    >
      <div className="w-[48px] animate-bounce h-[48px]  relative">
        <ViewCanvas index={index} textureUrl={src} />
      </div>
      <h3 className="text-2xl sm:text-2xl md:text-3xl   font-semibold">
        {header}
      </h3>
      <p className="text-lg lg:h-[80px] font-light">{desc}</p>
    </Link>
  );
};

export default SkillCard;
