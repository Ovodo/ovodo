"use client";

import { Button } from "@mui/material";
import React from "react";

interface CloseProps {
  clear: () => void;
  close: () => void;
  text?: string;
}

const Close: React.FC<CloseProps> = ({ clear, close, text }) => {
  return (
    <div className="flex justify-between items-center p-3 border-t-[1px] border-slate-800 border-opacity-50">
      <u className="cursor-pointer hover:text-myBrown" onClick={clear}>
        Clear
      </u>
      <Button
        className="bg-opacity-70"
        onClick={close}
        sx={{
          ":hover": {
            bgcolor: "#AF50",
            color: "#293d04",
          },
          color: "var(--binance_green)",
          backgroundColor: "var(--myGreen)",
          fontWeight: 400,
        }}
        variant="contained"
        color="primary"
      >
        {!text ? "close" : text}
      </Button>
    </div>
  );
};

export default Close;
