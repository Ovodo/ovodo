import React from "react";
import ViewCanvas from "./ViewCanvs";

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
    <div className='text-primary w-[362px] h-[220px]  sm:h-[268px] flex gap-2 md:gap-4 flex-col'>
      <div className='w-[100px] h-[100px] relative'>
        <ViewCanvas textureUrl={src} />
      </div>
      <h3 className='text-2xl sm:text-2xl md:text-3xl   font-semibold'>
        {header}
      </h3>
      <p className='text-lg font-light'>{desc}</p>
    </div>
  );
};

export default SkillCard;
