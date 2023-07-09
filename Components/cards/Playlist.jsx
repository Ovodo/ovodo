import React, { useEffect, useRef } from "react";
import Play from "@mui/icons-material/PlayCircle";
import { PauseCircle } from "@mui/icons-material";
// import { Audio } from "ts-audio";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSong,
  setIsPlaying,
} from "../../store/slice-reducers/AudioSlice";
import { motion } from "framer-motion";

const Playlist = ({ source }) => {
  const dispatch = useDispatch();
  const { IsPlaying, src } = useSelector((state) => state.audio);
  // const src = useSelector((state) => state.audio.src);
  const audio = useRef();

  useEffect(() => {
    IsPlaying & (src !== "") ? audio.current.play() : audio.current.pause();
  }, [IsPlaying, src]);

  const PlaySong = () => {
    dispatch(
      updateSong(
        "http://localhost:5000/assets/uploads/packs/125_Gmaj_trap_jazz/guitar_riff.wav"
      )
    );
    audio.current.toggle();
  };

  function togglePlay(sc) {
    IsPlaying ? audio.current.pause() & dispatch(updateSong(sc)) : false;
    dispatch(setIsPlaying());
    dispatch(updateSong(sc));
    return audio.current.paused ? audio.current.play() : audio.current.pause();
  }

  const onPlaying = () => {};

  return (
    <div
    // className='bg-myGreen bg-opacity-50 w-full '
    >
      <audio ref={audio} src={src}></audio>
      <motion.div
        onClick={() => togglePlay(source)}
        className='play_icon cursor-pointer inline-block mt-2'
      >
        {IsPlaying & (source === src) ? <PauseCircle /> : <Play />}
      </motion.div>
      <div className='nav_div'>
        <div className='seekbar'></div>
      </div>
    </div>
  );
};

export default Playlist;
