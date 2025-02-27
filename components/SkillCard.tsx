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
    <div className='text-primary min-w-[362px] skill-card h-[220px] rounded-lg p-4 sm:h-[268px] flex gap-2 md:gap-4 flex-col'>
      <div className='w-12 h-12 md:w-[80px] md:h-[80px] relative'>
        <ViewCanvas textureUrl={src} />
      </div>
      <h3 className='text-2xl sm:text-2xl md:text-3xl   font-semibold'>
        {header}
      </h3>
      <p className='text-sm font-light'>{desc}</p>
    </div>
  );
};

export default SkillCard;
