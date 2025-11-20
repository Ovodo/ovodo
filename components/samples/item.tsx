"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  IconHearts,
  IconPlus,
  IconHeartPlus,
  IconDotsVertical,
} from "@tabler/icons-react";
import { formatTime } from "../data/variables";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsPlaying,
  updateSong,
} from "../../store/slice-reducers/AudioSlice";
import Playlist from "../cards/Playlist";
import { RootState, AppDispatch } from "../../store/store";

interface SampleUser {
  title: string;
  time: number;
  key: string;
  bpm: number;
  path: string;
}

interface ItemProps {
  user: SampleUser;
}

const Samples: React.FC<ItemProps> = ({ user }) => {
  const { title, time, key, bpm, path } = user;
  const dispatch = useDispatch<AppDispatch>();

  const { src, IsPlaying } = useSelector((state: RootState) => state.audio);

  const play = () => {
    dispatch(updateSong(`http://localhost:5000/assets/uploads/packs/${path}`));
    src === `http://localhost:5000/assets/uploads/packs/${path}`
      ? dispatch(setIsPlaying())
      : dispatch(setIsPlaying(true));

    console.log("soft");
  };

  return (
    <>
      <div
        onClick={play}
        className="sampleBody gap-1 hover:bg-slate-400 hover:bg-opacity-30  py-1 items-center justify-between border-b-[.5px] border-opacity-20 border-slate-900 grid grid-cols-[.5fr,.5fr,.8fr,4.5fr,3.5fr,3fr,2.5fr,.5fr]"
      >
        <div className="flex justify-center items-center">
          <input width={"20px"} height={"20px"} type="checkbox" />
        </div>
        <div className="object-center border-2 border-myYellow">
          <img
            style={{ objectPosition: "center" }}
            src={"http://127.0.0.1:5000/assets/images/Afrolover.jpg"}
            alt=""
            width={"30px"}
            height={"30px"}
            className="object-cover object-center"
          />
        </div>
        <div className=""></div>
        <div className="">{title}</div>
        <div className=""></div>
        <div className="flex  justify-between px-2 ">
          <p>{formatTime(time)}</p>
          <p>{key}</p>
          <p>{bpm}</p>
        </div>
        <div className="flex justify-around  bg-opacity-30 three_icons">
          <IconPlus
            size={20}
            stroke={1.5}
            className="three_icon translate-x-60 opacity-0"
          />
          <IconHeartPlus
            size={20}
            stroke={1.5}
            className="three_icon translate-x-60 opacity-0"
          />
          <IconHearts
            size={20}
            stroke={1.5}
            className="three_icon translate-x-60 opacity-0"
          />
        </div>
        <div className="flex justify-center">
          <IconDotsVertical stroke={1.5} size={20} />
        </div>
      </div>
    </>
  );
};

export default Samples;
