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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/utils/firebase";

const Signup = ({}) => {
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

  const postUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
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
  };

  const postData = async (formdata) => {
    setIsloading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/user", formdata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(res);
      console.log("files recieved on the server");
      postUser();
    } catch (err) {
      if (err.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(err || "error from post");
      }
    }
    setIsloading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      bearer: profile,
      gmail: googleUser,
      email: email,
      password: password,
      clef: clef,
    };

    postData(formdata);

    console.log("sumbitted....not sure");
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
      <div
        style={{
          backgroundColor: "rgb(153, 195, 224,.5)",
        }}
        className='flex'
      >
        <section
          style={{
            background: "url(/assets/images/favourite_bear.jfif)",
            backgroundSize: "cover",
          }}
          className='z-20 bg-opacity-70 pic_section w-[50%]'
        >
          <div className='w-full h-full pt-3 bg-gray-900 bg-opacity-50'>
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
              className='ml-5 z-10'
              src='./assets/images/Egyptian_jazz.jfif'
              alt=''
            />
          </div>
        </section>
        <section className='login_section relative bg-opacity-20 flex flex-col space-y-20 justify-center items-center  w-[50%]'>
          {isloading ? (
            <>
              <h1>Loading...</h1>
              <CircleLoader color='#adf802' loading={isloading} size={150} />
            </>
          ) : (
            <>
              {" "}
              <h1 className='text-[#adf802] px-5  w-full text-2xl absolute top-5'>
                Join the{" "}
                <span className='text-gray-950 absolute left-[130px] text-3xl'>
                  𝄢rew{" "}
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
                    Sign Up
                  </button>
                  <button type='button' onClick={login}>
                    Sign up with Google{" "}
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
              <p>
                Already signed up?{" "}
                <span
                  onClick={() => {
                    router.push("/signin");
                  }}
                  className='text-[#adf802] underline cursor-pointer'
                >
                  Log in{" "}
                </span>
              </p>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Signup;

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
