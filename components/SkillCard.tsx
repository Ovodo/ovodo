import Image from "next/image";
import React from "react";

const SkillCard = ({
  src,
  header,
  desc,
}: {
  src: string;
  header: string;
  desc: string;
}) => {
  return (
    <div className='text-primary w-[362px] h-[220px]  sm:h-[268px] flex gap-2 md:gap-6 flex-col'>
      <div className='w-12 h-12 relative'>
        <Image className='object-cover ' alt={src} fill src={src} />
      </div>
      <h3 className='text-2xl sm:text-2xl md:text-3xl   font-semibold'>
        {header}
      </h3>
      <p className='text-lg font-light'>{desc}</p>
    </div>
  );
};

export default SkillCard;
