"use client";
import React, { useState } from "react";
import { MuseoModerno } from "next/font/google";
import Link from "next/link";
import OutsideClickHandler from "react-outside-click-handler";
import { usePathname } from "next/navigation";

export const muse = MuseoModerno({
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
      display="block"
      // ref={}
      onOutsideClick={() => setMenuOpen(false)}
    >
      <div className="relative ">
        <nav className="w-full  z-20 flex h-[92px]  bg-night md:bg-transparent   relative items-center md:items-end pb-[1.5%]  gap-[10px] sm:gap-[20px] md:gap-[40px]">
          <h5
            id="logo"
            className=" text-[32px]  sm:text-[40px] shadow-primary  leading-none  cursor-pointer md:text-[48px] text-primary font-semibold"
            style={muse.style}
          >
            Ovodo O.
          </h5>

          {/* Hamburger Menu Button */}
          <div
            id="menu-button"
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
            className={` md:flex  hidden relative p-1 bg-transparent   gap-8 flex-row  items-center h-auto `}
          >
            {["Home", "Projects", "Blog", "Services", "Contact"].map((item) => (
              <Link
                href={`${
                  item == "Home"
                    ? "/"
                    : item == "Services"
                    ? "/#services"
                    : item == "Contact"
                    ? "/#contact"
                    : `/${item.toLowerCase()}`
                }`}
                key={item}
                className={`text-night  ${
                  path == "/" && item == "Home"
                    ? "underline md:text-10"
                    : path.includes(item.toLowerCase())
                    ? "underline md:text-10"
                    : "no-underline md:text-primary"
                }     cursor-pointer  font-bold underline-offset-2  duration-75  hover:underline underline-to-10 md:hover:text-10`}
              >
                {item}
              </Link>
            ))}
          </ul>
        </nav>
        <ul
          className={`bg-primary  w-full absolute z-10 flex flex-col items-start gap-8 ease-in md:hidden p-[20px] h-auto transition-transform duration-400 ${
            menuOpen
              ? "translate-y-0  items-start md:items-center"
              : "-translate-y-[300px]"
          } md:translate-y-0 `}
        >
          {["Home", "Projects", "Blog", "Music", "Contact"].map((item) => (
            <Link
              href={`${
                item == "Home"
                  ? "/"
                  : item == "Services"
                  ? "/#services"
                  : item == "Contact"
                  ? "/#contact"
                  : `/${item.toLowerCase()}`
              }`}
              onClick={() => setMenuOpen(false)}
              key={item}
              className="text-night   cursor-pointer md:text-primary font-bold  duration-75  hover:underline underline-to-10 md:hover:text-10"
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
