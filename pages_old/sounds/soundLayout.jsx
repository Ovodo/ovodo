import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../Components/navbar_components/Navbar";
// import "./SamplePacks.css";
import { FaSearch } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { HeartIcon, PlusIcon } from "@radix-ui/react-icons";
import { BsHeart } from "react-icons/bs";
import { useRouter } from "next/router";

const SoundLayout = (children) => {
  const [term, setTerm] = useState("");
  const route = useRouter();

  return (
    <>
      <div id='contentPage' className=''>
        <section
          id='topSection'
          className='w-[100%] flex justify-between  bg-slate-700'
        >
          <h1 className='text-[18pt] flex items-center   text-slate-200 pl-5 '>
            <span className='flex items-end'>$ound</span>
            <span className='text-myYellow'>s</span>
          </h1>
          <div className='searchBar focus-within:border-[2px] focus-within:border-slate-400 pl-3 h-[60%] w-[30%] bg-slate-500 self-center'>
            <FaSearch color='#eceff1' className='self-center mr-3' />{" "}
            <input
              value={term}
              type='text'
              placeholder='Packs, samples, and presets.'
              className='w-full bg-transparent outline-none text-slate-300'
              onChange={(e) => setTerm(e.target.value)}
            />
            {term && (
              <RiCloseFill
                onClick={() => setTerm("")}
                color='#eceff1'
                size={25}
                className='self-center mr-3 cursor-pointer'
              />
            )}
          </div>
          <div className='flex justify-between'>
            <Link href={"/pricing"}>
              <p className='text-myYellow font-semibold mr-5 flex items-center'>
                Pricing
              </p>
            </Link>
            <p className=' mr-2 text-slate-400 border-l-2 h-[70%] self-center text-center flex pl-2 items-center border-l-slate-400'>
              𝄢 {0}
            </p>
          </div>
        </section>

        <div className='navFrame pt-5 pl-4 bg-slate-400'>
          <div className='mb-10 space-y-2'>
            <Link
              href='/sounds/cardArray'
              style={{
                display: "flex",
                alignItems: "center",
                // color: "#25092c",
                // fontFamily: "Patrick Hand",
              }}
              className={route.pathname == "/sounds" ? "utility" : "navlink"}
            >
              Samplepacks
            </Link>

            <Link
              href='/sounds/songs'
              style={{
                display: "flex",
                alignItems: "center",
                // color: "#25092c",
                // fontFamily: "Patrick Hand",
              }}
              className={route.pathname == "/sounds" ? "utility" : "navlink"}
            >
              Songs
            </Link>

            <Link
              href='/sounds/beats'
              style={{
                display: "flex",
                alignItems: "center",
                // color: "#25092c",
                // fontFamily: "Patrick Hand",
              }}
              className={route.pathname == "/sounds" ? "utility" : "navlink"}
            >
              Beats
            </Link>

            <Link
              href='/sounds/beats'
              style={{
                display: "flex",
                alignItems: "center",
                // color: "#25092c",
                // fontFamily: "Patrick Hand",
              }}
              className={route.pathname == "/sounds" ? "utility" : "navlink"}
            >
              Presets
            </Link>
          </div>
          <div className='mb-10'>
            <h6 className='text-[.75rem] font-[500]'>YOUR LIBRARY</h6>
            <p className='font-[400]'>Sounds</p>
          </div>
          <div>
            <h6 className='text-[.75rem] font-[500]'>COLLECTIONS</h6>
            <div className='flex items-center space-x-2'>
              <PlusIcon />
              <p className='navlink font-[400]'>New Collection</p>
            </div>
            <div className='flex items-center space-x-2'>
              <BsHeart />
              <p className='navlink font-[400]'>Likes</p>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "" }}
          className='bodyFrame overflow-y-scroll mx-auto w-full'
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SoundLayout;
