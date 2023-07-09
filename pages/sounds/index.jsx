import React from "react";
import Card from "../../Components/cards/Card";
// import { background } from "../../Components/slider/Sliderdata";
import SoundLayout from "./soundLayout";
import PacksCard from "@/Components/cards/PacksCard";

const index = ({ background, ssr = false }) => {
  const { packs } = background;
  console.log(packs[0]._id);
  return (
    <div className=''>
      <div className='cardArray  mx-auto w-[1200px] mt-10 grid grid-cols-5'>
        {packs.map((item, index, array) => (
          <Card pack={item} key={item._1d} />
        ))}
      </div>
    </div>
  );
};
index.getLayout = SoundLayout;
export default index;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/post");

  const background = await res.json();

  return {
    props: {
      background,
    },
  };
};
