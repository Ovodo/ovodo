"use client";

import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "@/components/Footer";

export default function Pricing() {
  const [isloading, setIsloading] = useState(false);

  const { email, phone, name } = useSelector((state: any) => state.Web3);

  const config = {
    public_key: "FLWPUBK_TEST-fae61d03498ae9059ded435a0eb17bf3-X",
    tx_ref: Date.now().toString(),
    amount: 200,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "Beginner Option",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const purchaseClef = async (url: string) => {
    setIsloading(true);

    try {
      const res = await axios.post(
        url,
        { gmail: email },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res);
      console.log("files received on the server");
    } catch (err: any) {
      if (err.status === 500) {
        console.log("there was a problem with the server");
      } else {
        console.log(err || "error from post");
      }
    }
    setIsloading(false);
  };

  return (
    <div>
      {/* Pricing Amount and perks */}
      <div
        style={{
          background: "url(/assets/images/pri.svg)",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        className="price_section border-b-[0px] border-gray-600 flex flex-col items-center md:flex-row md:justify-around  bg-slate-300"
      >
        <div className="price_box">
          <button
            className=""
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  purchaseClef("/api/subscription/beginner");
                  console.log(response);
                  closePaymentModal();
                },
                onClose: () => {},
              });
            }}
          >
            Beginner $4.99
          </button>
          <ul>
            <li>50 clef points </li>
            <li>Download all contents on the platform </li>
          </ul>
          <h1 className="price bg-opacity-40 px-[1vw] bg-myBrown rounded-md text-[25px] md:text-[55px]">
            + <i className="text-lemon mr-2 top-1 relative">𝄢</i>50
          </h1>
        </div>
        <div className="price_box">
          <button
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  purchaseClef("/api/subscription/intermediate");
                  console.log(response);
                  closePaymentModal();
                },
                onClose: () => {},
              });
            }}
            className=""
          >
            Intermediate $11.99
          </button>
          <ul>
            <li>150 clef points </li>
            <li>ability to upload your sounds</li>
            <li>ability to upload your artwork</li>
          </ul>
          <h1 className="price bg-opacity-40 px-[1vw] bg-myBrown rounded-md text-[25px] md:text-[55px]">
            + <i className="text-lemon mr-2 top-1 relative">𝄢</i>150
          </h1>
        </div>
        <div className="price_box">
          <button
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  purchaseClef("/api/subscription/advanced");
                  console.log(response);
                  closePaymentModal();
                },
                onClose: () => {},
              });
            }}
            className=""
          >
            Advanced $19.99
          </button>
          <ul>
            <li>150 clef points </li>
            <li>ability to upload your sounds</li>
            <li>ability to upload your artwork</li>
            <li>ability to upload merch</li>
            <li>AI image generation for sample cover</li>
          </ul>
          <h1 className="price bg-opacity-40 px-[1vw] bg-myBrown rounded-md text-[25px] md:text-[55px]">
            + <i className="text-lemon mr-2 top-1 relative">𝄢</i>500
          </h1>
        </div>
      </div>
      {/* Details and information */}
      <div
        style={{
          background: "url(/assets/images/pri.svg)",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          position: "relative",
          transform: "rotate(180deg)",
        }}
        className="min-h-screen bg-thatGreen"
      >
        <div className="min-h-screen border-double border-y-[1px] border-opacity-40 py-[2vw] border-lemon bg-opacity-0  px-[2vw] rotate-180 bg-purple-400">
          <div className="space-y-10">
            <li>
              <h3 className="font-medium mx-[3vw] mb-[1vh]">𝄢 Clef Points</h3>
              <p>
                This is the native currency for the ecosystem and can be used to
                purchase and upload samples, arts, merchandize. The more clef's
                you have the more benefits you have in and out of the platform.
              </p>
            </li>
            <li>
              <h3 className="font-medium mx-[3vw] my-[1vh]">🔉 Sounds</h3>
              <p>
                Music, samples, samplepacks, and presets are all categorized as
                sounds. And these can be uploaded and downloaded depending on
                your clef points and user level.
              </p>
            </li>
            <li>
              <h3 className="font-medium mx-[3vw] my-[1vh]">🎨 Artwork</h3>
              <p>
                Artwork can be categorized as a digital representation of either
                a digital art or a physical art. These can be uploaded to the
                nfts section and downloaded by members of the community. Only
                members with the intermediate badge and above can upload their
                masterpiece.
              </p>
            </li>
            <li>
              <h3 className="font-medium mx-[3vw] my-[1vh]">👕 Merchandize</h3>
              <p>
                Merchandize such as branded T-shirts, Caps, Bags, e.t.c can be
                uploaded and sold on the platform in exchange for a certain
                amount of clef's. Note that only advanced users are allowed to
                upload merch to the platform.
              </p>
            </li>
            <li>
              <h3 className="font-medium mx-[3vw] my-[1vh]">
                🤖 AI Image generation
              </h3>
              <p>
                Advanced users will have the ability to generate images using an
                AI prompt and these images can either be sold on the nft's
                section or used as a coverart for samplepacks.
              </p>
            </li>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
