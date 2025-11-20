"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import Logo from "@/components/navbar_components/Logo";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, Password, User } from "@/store/slice-reducers/Web3slice";
import { CircleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/utils/firebase";
import Image from "next/image";

export default function SignIn() {
  const [profile, setProfile] = useState<any>({});
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const { googleUser, email, password } = useSelector(
    (state: any) => state.Web3
  );

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setProfile(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const loginUser = async () => {
    setIsloading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/pricing");
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });

    setIsloading(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser();
    console.log("logging in..");
  };

  useEffect(() => {
    if (profile.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${profile.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${profile.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(User(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [profile, dispatch]);

  return (
    <div
      style={{
        backgroundColor: "var(--primary)",
      }}
      className="flex"
    >
      <section className="z-20 relative bg-opacity-70 pic_section w-[40%] lg:w-[50%]">
        <Image
          src="/assets/images/warm.jfif"
          alt="Warm"
          fill
          className="object-cover"
        />
        <div className="w-full h-full pt-3 bg-gray-90 bg-opacity-50">
          <motion.img
            animate={{
              rotate: [0, 360, 0, 540, 0, 360],
            }}
            transition={{
              duration: 100,
              ease: "easeInOut",
              delay: 3,
              type: "tween",
              repeat: Infinity,
            }}
            className="ml-5 w-[50px] h-[50px] lg:w-[10%] lg:h-[10%] rounded-full lg:rounded-[10px] z-10"
            src="/assets/images/Egyptian_jazz.jfif"
            alt=""
          />
        </div>
      </section>
      <section className="login_section z-20 relative bg-opacity-20 flex flex-col space-y-20 justify-center items-center w-[60%] lg:w-[50%]">
        {isloading ? (
          <>
            <h1>Loading...</h1>
            <CircleLoader color="#adf802" loading={isloading} size={150} />
          </>
        ) : (
          <>
            <div className="flex flex-col items-start  px-5 gap-3 w-full justify-between  lg:flex-row left-0 absolute top-5 lg:items-center ">
              <h1 className="text-lemon  text-2xl">
                Welcome{" "}
                <span className="text-gray-500 ml-2 text-3xl">Back </span>
              </h1>
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: 5,
                  type: "spring",
                  repeatDelay: 10,
                  repeatType: "mirror",
                }}
                className="rounded-full w-12 p-1 h-12 flex items-center justify-center bg-lemon"
              >
                <Logo />
              </motion.div>
            </div>
            <form className="input_div flex flex-col gap-20">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col space-y-1 items-center">
                  <label htmlFor="name">Email</label>
                  <input
                    className="border border-gray-500 rounded-xl"
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    type="text"
                  />
                </div>
                <div className="flex flex-col space-y-1 items-center">
                  <label htmlFor="password">Password</label>
                  <input
                    required
                    className="border border-gray-500 rounded-xl"
                    onChange={(e) => dispatch(Password(e.target.value))}
                    type="password"
                  />
                </div>
              </div>

              <div className="relative bottom-6 flex flex-col items-center gap-10">
                <button
                  type="button"
                  className="text-xs lg:text-sm"
                  onClick={onSubmit}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="text-xs lg:text-sm"
                  onClick={() => login()}
                >
                  Sign In with Google{" "}
                  <IconBrandGoogle
                    className="ml-1"
                    size={15}
                    stroke={2}
                    color="#adf802"
                  />
                </button>
              </div>
            </form>
            <motion.img
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{
                rotate: [0, 360, 0, 540, 0, 360],
              }}
              transition={{
                duration: 100,
                ease: "easeInOut",
                delay: 3,
                type: "tween",
                repeat: Infinity,
              }}
              className="absolute  w-[50px] h-[50px] lg:w-[10%] lg:h-[10%] rounded-full lg:rounded-[10px]  bottom-5 right-5 ml-5 z-10"
              src="/assets/images/colourful_bear.jfif"
              alt=""
            />
            <p>
              Forgot Password?{" "}
              <span
                onClick={() => {
                  sendPasswordResetEmail(auth, email)
                    .then(() => {
                      alert("Password reset email sent!");
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      console.error(errorCode);
                    });
                }}
                className="text-lemon underline cursor-pointer"
              >
                Reset
              </span>
            </p>
          </>
        )}
      </section>
    </div>
  );
}
