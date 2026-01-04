"use client";

import React, { useState } from "react";
import SubscribeModal, { SubscribeButton } from "./SubscribeModal";

export default function SubscribeInline() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SubscribeButton onClick={() => setOpen(true)} />
      <SubscribeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
