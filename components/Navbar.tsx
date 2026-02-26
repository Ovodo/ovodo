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

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" />
  </svg>
);

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);

const BookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M3 6v12a2 2 0 0 0 2 2h14" />
    <path d="M7 6a2 2 0 0 1 2-2h8v14" />
  </svg>
);

const MusicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M9 17V5l10-2v12" />
    <circle cx="7" cy="17" r="3" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M3 8.5v7A2 2 0 0 0 5 18.5h14a2 2 0 0 0 2-2v-7" />
    <path d="M21 6.5l-9 6-9-6" />
  </svg>
);

const ServicesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  const hideSidebar = path?.startsWith("/projects/");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <OutsideClickHandler
      display="block"
      // ref={}
      onOutsideClick={() => setMenuOpen(false)}
    >
      <div className="relative">
        {/* Collapsed floating sidebar (desktop) */}
        {!hideSidebar && (
          <aside
            aria-label="Main Navigation"
            className="hidden md:flex fixed left-6 top-6 z-40"
          >
            <div className="panel panel--glass panel--glass-silver sidebar-compact group w-14 hover:w-56 transition-all duration-200 overflow-hidden flex flex-col items-start p-3">
              <div className="flex items-center w-full mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--background)] font-semibold">
                  O
                </div>
              </div>
              <nav className="w-full flex flex-col gap-1">
                {[
                  { name: "Home", href: "/", icon: HomeIcon },
                  { name: "Projects", href: "/projects", icon: FolderIcon },
                  { name: "Services", href: "/services", icon: ServicesIcon },
                  { name: "Blog", href: "/blog", icon: BookIcon },
                  { name: "Music", href: "/music", icon: MusicIcon },
                  { name: "Contact", href: "/#contact", icon: MailIcon },
                ].map((item) => {
                  const active =
                    path === item.href ||
                    path?.includes(item.name.toLowerCase());
                  return (
                    <Link
                      href={item.href}
                      key={item.name}
                      className={`nav-item w-full flex items-center gap-3 px-2 py-2 transition-colors duration-150 ${
                        active ? "active" : ""
                      }`}
                    >
                      <span
                        className={`icon-wrap inline-flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-colors duration-150 ${
                          active
                            ? "bg-[var(--background)] text-[var(--accent)]"
                            : "bg-transparent text-[var(--muted)]"
                        }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active ? "text-[var(--accent)]" : ""
                          }`}
                        />
                      </span>
                      <span className="label ml-1 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium text-[var(--text)]">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        <nav className="w-full  z-20 flex h-[92px]  bg-night md:bg-transparent   relative items-center md:items-end pb-[1.5%]  gap-[10px] sm:gap-[20px] md:gap-[40px]">
          <h5
            id="logo"
            className=" text-[32px]  sm:text-[40px] shadow-primary  leading-none  cursor-pointer md:text-[48px] text-[var(--text)] font-semibold flex items-center gap-2"
            style={muse.style}
          >
            <span>Ovodo</span>
            <span className="text-accent">O.</span>
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
            {["Home", "Projects", "Services", "Blog", "Contact"].map((item) => (
              <Link
                href={`${
                  item == "Home"
                    ? "/"
                    : item == "Services"
                      ? "/services"
                      : item == "Contact"
                        ? "/#contact"
                        : `/${item.toLowerCase()}`
                }`}
                key={item}
                className={`text-night  ${
                  path == "/" && item == "Home"
                    ? "underline text-accent md:text-10"
                    : path.includes(item.toLowerCase())
                      ? "underline text-accent md:text-10"
                      : "no-underline md:text-primary"
                }     cursor-pointer  font-bold underline-offset-2  duration-75  hover:underline underline-to-10 md:hover:text-10`}
              >
                {item}
              </Link>
            ))}
          </ul>
        </nav>
        <ul
          className={`bg-primary w-full absolute z-50 flex flex-col items-start gap-6 ease-in md:hidden p-[20px] h-auto transition-all duration-300 ${
            menuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-[110%] opacity-0 pointer-events-none"
          } md:translate-y-0`}
        >
          {["Home", "Projects", "Services", "Blog", "Music", "Contact"].map(
            (item) => (
              <Link
                href={`${
                  item == "Home"
                    ? "/"
                    : item == "Services"
                      ? "/services"
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
            ),
          )}
        </ul>
      </div>
    </OutsideClickHandler>
  );
};

export default Navbar;
