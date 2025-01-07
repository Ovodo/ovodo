"use client";
import React, { useState } from "react";
import { MuseoModerno } from "next/font/google";
import Link from "next/link";
import OutsideClickHandler from "react-outside-click-handler";

const muse = MuseoModerno({
  weight: ["600"],
  subsets: ["latin"],
  style: ["normal"],
});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <OutsideClickHandler
      display='block'
      // ref={}
      onOutsideClick={() => setMenuOpen(false)}
    >
      <nav className='w-full z-20 flex h-[92px]  bg-night relative items-center md:items-end pb-[1.5%] gap-[40px]'>
        <h5
          className='text-[32px]  leading-none  cursor-pointer sm:text-[48px] text-primary font-semibold'
          style={muse.style}
        >
          Ovodo.
        </h5>

        {/* Hamburger Menu Button */}
        <div
          id='menu-button'
          className={`md:hidden z-50 w-[60px] flex flex-col justify-center bg-primary rounded-full gap-1 h-[60px] cursor-pointer ${
            menuOpen ? "opacity-50" : "opacity-100"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`w-[30px] mx-auto bg-night h-[5px] rounded-full transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <div
            className={`w-[30px] mx-auto bg-night h-[5px] rounded-full transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`w-[30px] mx-auto bg-night h-[5px] rounded-full transition-transform duration-300 ${
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
              className='text-night  tracking-wider cursor-pointer md:text-primary font-bold  duration-75  hover:underline underline-to-10 md:hover:text-10'
            >
              {item}
            </Link>
          ))}
        </ul>
      </nav>
      <ul
        className={`bg-primary  w-full z-10  flex flex-col items-start gap-8 ease-in md:hidden p-[20px] h-auto transition-transform duration-500 ${
          menuOpen
            ? "translate-y-0  items-start md:items-center"
            : "-translate-y-[300px]"
        } md:translate-y-0 `}
      >
        {["Home", "Projects", "Blog", "Contact"].map((item) => (
          <Link
            href={`${item}`}
            key={item}
            className='text-night  tracking-wider cursor-pointer md:text-primary font-bold  duration-75  hover:underline underline-to-10 md:hover:text-10'
          >
            {item}
          </Link>
        ))}
      </ul>
    </OutsideClickHandler>
  );
};

export default Navbar;
