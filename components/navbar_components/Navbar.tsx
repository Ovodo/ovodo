"use client";

import React, { useState, ReactNode } from "react";
import { GiWallet } from "react-icons/gi";
import { IoMdCart } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineBars } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { updateAddress } from "../../store/slice-reducers/Web3slice";
import { useDispatch } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import Logo from "./Logo";

interface NavbarProps {
  children?: ReactNode;
}

interface EthereumProvider {
  request: (args: { method: string }) => Promise<string[]>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const sm = typeof window !== "undefined" && window.innerWidth < 789;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [showmenu, setShowmenu] = useState(false);
  const dispatch = useDispatch();
  const controls = useAnimation();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setDefaultAccount(accounts[0]);
        dispatch(updateAddress(accounts[0]));
      } catch (error) {
        console.log("err:" + error);
      }
    } else {
      console.log("metamask not detected");
    }
  };

  const primary = "#25092c";

  const toggleMenu = () => {
    setShowmenu(!showmenu);
  };

  const hideMenu = () => {
    setShowmenu(false);
  };

  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ x: 0 }}
      animate={{ x: [200, 0] }}
      className="navbar  px-5 stick top-0"
    >
      <div className="logo-menu w-full flex flex-row-reverse  items-center justify-between lg:w-auto ">
        <motion.div
          initial={{}}
          animate={{
            y: [0, -15, 0, -15, 0, -17, 0, -12, 0],
          }}
          transition={{
            delay: 0.1,
            repeat: 7,
            duration: 4,
          }}
          className="logos"
        >
          <Link href="/">
            <Logo />
          </Link>
        </motion.div>
        <div className="menu-icons" onClick={toggleMenu}>
          {showmenu ? (
            <RiCloseLine color={primary} size={35} />
          ) : (
            <AiOutlineBars color={primary} size={35} />
          )}
        </div>
      </div>

      <menu className="">
        <motion.ul
          className="nav-menu rounded-tr-2xl rounded-br-2xl"
          id={showmenu ? "mobile" : "hide"}
          onHoverStart={() => controls.stop()}
        >
          <div className="flex md:flex-row  lg:w-[60vw] p-[3px] pt-10 md:pt-0 gap-5 lg:justify-between flex-col flex-1">
            <Link href="/">
              <motion.li
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.8 }}
                drag
                dragSnapToOrigin
                onHoverStart={(e, i) => {
                  console.log(e, i);
                }}
                transition={{ type: "tween", duration: 0.2 }}
                onClick={() => {
                  hideMenu();
                }}
              >
                Home
              </motion.li>
            </Link>
            <motion.li
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={hideMenu}
              className="flex"
            >
              <Link
                href="/sounds"
                style={{
                  color:
                    pathname === "/sounds" ? "rgb(100 116 139)" : "inherit",
                }}
              >
                $ounds
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={hideMenu}
            >
              <Link href="/join" target="targetFrame">
                NFTs
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={hideMenu}
            >
              <Link href="./songs">Merch</Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={hideMenu}
            >
              <Link className="opacity-50" href="">
                $ales
              </Link>
            </motion.li>
          </div>

          {/* Mobile Icons in Drawer */}
          <div className="mobile-icons !mt-auto">
            <li>
              <Link onClick={connectWallet} href="/">
                {defaultAccount ? (
                  <div className="flex flex-col items-center">
                    <TiTick color="var(--primary)" />
                    <p className="text-[10px]">Connected!!</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <GiWallet />
                    <span>Connect Wallet</span>
                  </div>
                )}
              </Link>
            </li>
            <li>
              <Link href="/songs" className="flex items-center gap-2">
                <IoMdCart />
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link href="/Join" className="flex items-center gap-2">
                <FaUserAlt />
                <span>Profile</span>
              </Link>
            </li>
          </div>
        </motion.ul>
      </menu>

      <div className="icon flex items-center">
        <li>
          <Link onClick={connectWallet} href="/">
            {defaultAccount ? (
              <div className="flex flex-col items-center">
                <TiTick color="var(--primary)" />
                <p className="text-[10px]">Connected!!</p>
              </div>
            ) : (
              <GiWallet />
            )}
          </Link>
        </li>
        <li>
          <Link href="/songs">
            <IoMdCart />
          </Link>
        </li>
        <li>
          <Link href="/Join">
            <FaUserAlt />
          </Link>
        </li>
      </div>
    </motion.nav>
  );
};

export default Navbar;
