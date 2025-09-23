import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/navbar_components/Navbar";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import Logo from "../Components/navbar_components/Logo";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, Password, User } from "../store/slice-reducers/Web3slice";
import { CircleLoader } from "react-spinners";
import { useRouter } from "next/router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/utils/firebase";

const Signin = ({}) => {
  const [profile, setProfile] = useState({});
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const { googleUser, email, password } = useSelector((state) => state.Web3);

  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      postData(formdata);
      setProfile(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const loginUser = async () => {
    setIsloading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/pricing");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        // console.log(errorMessage);
        // ..
      });

    setIsloading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    loginUser();

    console.log("loging in..");
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
  }, [profile]);

  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          backgroundColor: "rgb(153, 195, 224,.5)",
        }}
        className='flex overflow-hidden'
      >
        <section
          style={{
            background: "url(/assets/images/warm.jfif)",
            backgroundSize: "cover",
            backgroundPositionX: "-6rem",
            backgroundPositionY: "-12rem",
            // overflow: "hidden",
          }}
          className='z-20 bg-opacity-70 pic_section w-[70%]'
        >
          <div className='w-full h-full pt-3 bg-gray-900 bg-opacity-0'>
            <motion.img
              animate={{
                rotate: [0, 360, 0, 540, 0, 360],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                delay: 10,
                type: "tween",
                repeat: Infinity,
                repeatDelay: 10,
              }}
              className='ml-5 z-10'
              src='./assets/images/Egyptian_jazz.jfif'
              alt=''
            />
          </div>
        </section>
        <section className='login_section z-20 relative bg-opacity-20 flex flex-col space-y-20 justify-center items-center w-[30%]'>
          {isloading ? (
            <>
              <h1>Loading...</h1>
              <CircleLoader color='#adf802' loading={isloading} size={150} />
            </>
          ) : (
            <>
              {" "}
              <h1 className='text-[#adf802] px-5  w-full text-2xl absolute top-5'>
                Welcome{" "}
                <span className='text-gray-950 absolute left-[130px] ml-4 text-3xl'>
                  Back{" "}
                </span>
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
                  className='rounded-[50%] w-8 h-8 bg-[#adf802] '
                >
                  <div className='text-gray-950 flex justify-start text-[5px] text-left'>
                    <Logo />
                  </div>
                </motion.div>
              </h1>
              <form className='input_div space-y-10'>
                <div className='flex flex-col space-y-1 items-center'>
                  <label htmlFor='name'>Email</label>
                  <input
                    // required
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    type='text'
                  />
                </div>
                <div className='flex flex-col space-y-1 items-center'>
                  <label htmlFor='password'>Password</label>
                  <input
                    required
                    onChange={(e) => dispatch(Password(e.target.value))}
                    type='password'
                  />
                </div>

                <div className='relative bottom-6 flex flex-col items-center space-y-10'>
                  <button type='button' onClick={onSubmit}>
                    Sign In
                  </button>
                  <button type='button' onClick={login}>
                    Sign In with Google{" "}
                    <IconBrandGoogle
                      className='ml-1'
                      size={15}
                      stroke={2}
                      color='#adf802'
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
                className='absolute bottom-5 right-5 ml-5 z-10'
                src='./assets/images/colourful_bear.jfif'
                alt=''
              />
              {/* <p>
                Want to leave?{" "}
                <span
                  onClick={() => {
                    // signOut(auth)
                    //   .then(() => {
                    //     // Sign-out successful.
                    //     alert("You have been logged out");
                    //   })
                    //   .catch((error) => {
                    //     // An error happened.
                    //   });
                    console.log(auth.currentUser.email);
                  }}
                  className='text-[#adf802] underline'
                >
                  <Link href='/signup'>Log out </Link>
                </span>
              </p> */}
              <p>
                Forgot Password?{" "}
                <span
                  onClick={() => {
                    sendPasswordResetEmail(auth, email)
                      .then(() => {
                        // Password reset email sent!
                        // ..
                        alert("Password reset email sent!");
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                      });
                    console.log(auth.currentUser.email);
                  }}
                  className='text-[#adf802] underline'
                >
                  Reset
                </span>
              </p>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Signin;

// export async function getServerSideProps() {
//   let res = await fetch("http://localhost:3000/api/post");
//   let allPosts = await res.json();

//   return {
//     props: { allPosts },
//   };
// }

// export async function getServerSideProps() {
//   try {
//     const client = await clientPromise;
//     const db = client.db();

//     const movies = await db
//       .collection("samplepacks")
//       .find({})
//       // .sort({ metacritic: -1 })
//       // .limit(20)
//       .toArray();

//     return {
//       props: { allPosts: JSON.parse(JSON.stringify(movies)) },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }
