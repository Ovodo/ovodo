"use client";
import Link from "next/link";
import { muse } from "./Navbar";
import { usePathname } from "next/navigation";

const Footer = () => {
  // --------------------------------------------VARIABLES
  const path = usePathname();

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className="w-full flex flex-col h-[50vh] justify-center ">
      <div className="flex w-full flex-col py-[10vh]  lg:flex-row h-full">
        <div className="flex  w-[30%]  h-full flex-col">
          <h5
            id="logo"
            className=" text-[32px]  sm:text-[40px] shadow-primary  leading-none  cursor-pointer  text-primary font-semibold"
            style={muse.style}
          >
            Ovodo O.
          </h5>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 justify-around  flex-1">
          <div className="flex gap-5 flex-col">
            <h6 className="font-medium mb-4 text-lg text-primary lg:text-xl">
              Quick Links
            </h6>
            {["Projects", "Blog", "Services", "Contact"].map((item) => (
              <Link
                href={`${
                  item == "Services"
                    ? "/?#services"
                    : item == "Contact"
                    ? "#contact"
                    : `/${item.toLowerCase()}`
                }`}
                key={item}
                className={`text-night  ${
                  path == "/" && item == "Home"
                    ? "underline md:text-10"
                    : path.includes(item.toLowerCase())
                    ? "underline md:text-10"
                    : "no-underline md:text-primary"
                }     cursor-pointer  font-light underline-offset-2  duration-75  hover:underline underline-to-10 md:hover:text-10`}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex gap-5 flex-col">
            <h6 className="font-medium mb-4 text-lg text-primary lg:text-xl">
              Connect with me
            </h6>
            {["Github", "Twitter", "Linkedin"].map((item) => (
              <Link
                href={`${item == "Home" ? "/" : `/${item.toLowerCase()}`}`}
                key={item}
                className={`text-night  ${
                  path == "/" && item == "Home"
                    ? "underline md:text-10"
                    : path.includes(item.toLowerCase())
                    ? "underline md:text-10"
                    : "no-underline md:text-primary"
                }     cursor-pointer  font-light underline-offset-2  duration-75  hover:underline underline-to-10 md:hover:text-10`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="font-thin my-5  text-xs lg:text-sm text-primary">
        © 2024 Ovodo Ohwovoriole. All rights reserved.
      </p>
    </div>
  );
};
export default Footer;
