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

interface SamplesProps {
  samples: any[];
}

const Samples: React.FC<SamplesProps> = ({ samples }) => {
  return (
    <div>
      <div className="topHeader h-8 items-center  justify-between border-y-[1px] border-opacity-50 border-slate-900 grid grid-cols-[.5fr,.5fr,.8fr,4.5fr,3.5fr,3fr,2.5fr,.5fr]">
        <div className=""></div>
        <div className="">Pack</div>
        <div className=""></div>
        <div className="">Filename</div>
        <div className=""></div>
        <div className="flex  justify-between px-2 ">
          <p>Time</p>
          <p>Key</p>
          <p>Bpm</p>
        </div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Samples;
