"use client";
import React, { useState } from "react";
import { MuseoModerno } from "next/font/google";
import Link from "next/link";
import OutsideClickHandler from "react-outside-click-handler";
import { usePathname } from "next/navigation";

const muse = MuseoModerno({
  weight: ["600"],
  subsets: ["latin"],
  style: ["normal"],
});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <OutsideClickHandler
      display='block'
      // ref={}
      onOutsideClick={() => setMenuOpen(false)}
    >
      <div className={`relative ${path.includes("cv") ? "hidden" : ""} `}>
        <nav className='w-full z-20 flex h-[92px]  bg-night md:bg-transparent relative items-center md:items-end pb-[1.5%] gap-[10px] sm:gap-[20px] md:gap-[40px]'>
          <h5
            id='logo'
            className=' text-[32px] sm:text-[40px] shadow-primary  leading-none  cursor-pointer md:text-[48px] text-primary font-semibold'
            style={muse.style}
          >
            Ovodo.
          </h5>

          {/* Hamburger Menu Button */}
          <div
            id='menu-button'
            className={`md:hidden  z-50 w-[48px] h-[48px] md:w-[60px] flex flex-col justify-center bg-primary rounded-full gap-1 md:h-[60px] cursor-pointer ${
              menuOpen ? "opacity-50" : "opacity-100"
            }`}
            onClick={toggleMenu}
          >
            <div
              className={`w-[24px] sm:w-[24px] md:w-[30px] h-[5px] mx-auto bg-night  rounded-full transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <div
              className={`w-[24px] sm:w-[24px] md:w-[30px] h-[5px] mx-auto bg-night  rounded-full transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className={`w-[24px] sm:w-[24px] md:w-[30px] h-[5px] mx-auto bg-night  rounded-full transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>

          {/* Navigation Menu */}
          <ul
            className={` md:flex  hidden relative p-1 bg-transparent w-full  gap-8 flex-row  items-center h-auto `}
          >
            {["Home", "Projects", "Blog", "Contact"].map((item) => (
              <Link
                href={`${item}`}
                key={item}
                className='text-night   cursor-pointer md:text-primary font-bold  duration-75  hover:underline underline-to-10 md:hover:text-10'
              >
                {item}
              </Link>
            ))}
          </ul>
        </nav>
        <ul
          className={`bg-primary  w-full absolute z-10 flex flex-col items-start gap-8 ease-in md:hidden p-[20px] h-auto transition-transform duration-[400ms] ${
            menuOpen
              ? "translate-y-0  items-center md:items-center rounded-b-full"
              : "-translate-y-[300px] items-center rounded-b-full"
          } md:translate-y-0 `}
        >
          {["Home", "Projects", "Blog", "Contact"].map((item) => (
            <Link
              href={`${item}`}
              key={item}
              className='text-night   cursor-pointer md:text-primary font-bold  duration-75  hover:underline underline-to-10 md:hover:text-10'
            >
              {item}
            </Link>
          ))}
        </ul>
      </div>
    </OutsideClickHandler>
  );
};

export default Navbar;
