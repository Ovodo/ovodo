"use client";

import React, { useEffect, useRef } from "react";
import Play from "@mui/icons-material/PlayCircle";
import { PauseCircle } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSong,
  setIsPlaying,
} from "../../store/slice-reducers/AudioSlice";
import { motion } from "framer-motion";
import { RootState, AppDispatch } from "../../store/store";

interface PlaylistProps {
  source?: string;
}

const Playlist: React.FC<PlaylistProps> = ({ source }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { IsPlaying, src } = useSelector((state: RootState) => state.audio);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio.current) {
      IsPlaying && src !== "" ? audio.current.play() : audio.current.pause();
    }
  }, [IsPlaying, src]);

  const PlaySong = () => {
    dispatch(
      updateSong(
        "http://localhost:5000/assets/uploads/packs/125_Gmaj_trap_jazz/guitar_riff.wav"
      )
    );
    if (audio.current) {
      audio.current.paused ? audio.current.play() : audio.current.pause();
    }
  };

  function togglePlay(sc?: string) {
    if (audio.current) {
      if (IsPlaying) {
        audio.current.pause();
        if (sc) dispatch(updateSong(sc));
      }
      dispatch(setIsPlaying());
      if (sc) dispatch(updateSong(sc));
      audio.current.paused ? audio.current.play() : audio.current.pause();
    }
  }

  return (
    <div>
      <audio ref={audio} src={src}></audio>
      <motion.div
        onClick={() => togglePlay(source)}
        className="play_icon cursor-pointer inline-block mt-2"
      >
        {IsPlaying && source === src ? <PauseCircle /> : <Play />}
      </motion.div>
      <div className="nav_div">
        <div className="seekbar"></div>
      </div>
    </div>
  );
};

export default Playlist;
