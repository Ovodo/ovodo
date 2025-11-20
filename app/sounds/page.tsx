import React from "react";
import Card from "@/components/cards/Card";

interface SoundsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getPacks() {
  try {
    const res = await fetch("http://localhost:3000/api/post", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching packs:", error);
    return { packs: [] };
  }
}

export default async function SoundsPage({ searchParams }: SoundsPageProps) {
  const background = await getPacks();
  const { packs = [] } = background;

  return (
    <div className="">
      <div className="cardArray  mx-auto w-[1200px] mt-10 grid grid-cols-5">
        {packs.map((item: any, index: number) => (
          <Card pack={item} key={item._id || index} />
        ))}
      </div>
    </div>
  );
}
