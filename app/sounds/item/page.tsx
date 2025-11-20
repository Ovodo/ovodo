"use client";

import CircleIcon from "@mui/icons-material/Circle";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterItem from "@/components/filter/FilterItem";
import FilterKey from "@/components/filter/FilterKey";
import FilterSingle from "@/components/filter/FilterSingle";
import FilterBpm from "@/components/filter/FilterBpm";
import Samples from "@/components/samples/Samples";
import axios from "axios";
import {
  IconPlayerPlay,
  IconFolderPlus,
  IconHeartPlus,
} from "@tabler/icons-react";
import Pagination from "@/components/samples/Pagination";
import Users from "@/components/samples/Sample";
import { useSearchParams } from "next/navigation";

const bp = (size: number) => {
  return (
    <CircleIcon
      className="mr-2 animate-spin text-slate-500"
      sx={{ fontSize: size }}
    />
  );
};

const names = [
  "guitar",
  "keyboard",
  "drums",
  "brass & woodwind",
  "synth",
  "percussions",
  "cymbals & hats",
  "snare",
  "tom",
  "conga",
];

const data = {
  url: "/assets/images/Egyptian_jazz.jfif",
  artiste: "Artist Name",
  title: "Pack Title",
};

export default function ItemPage() {
  const USERS_PER_PAGE = 15;
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const myData = searchParams.get("myData");

  const getData = async () => {
    try {
      const res = await axios.get("/uploader");
      const datas = res.data[0].Pack;
      setUsers(datas);
      setTotalPages(Math.ceil(datas.length / USERS_PER_PAGE));
      setIsLoading(false);
    } catch (error) {
      console.log("Error:" + error + "Get data unsuccessful");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const handleClick = (number: number) => {
    setPage(number);
  };

  return (
    <div className="h-[1500px]">
      <section className="flex h-[225px]  mb-5 ">
        <div
          className="image_div"
          style={{
            width: "300px",
            height: "225px",
            padding: 10,
          }}
        >
          <div
            className="rounded w-full h-full object-cover"
            style={{ background: `url(${data.url})` }}
          ></div>
        </div>
        <div className="Pack_details pl-5 pt-1 flex flex-col justify-between w-full h-[225px]">
          <div className="Details  flex flex-col space-y-1 w-full">
            <Typography variant="h6">{data.artiste}</Typography>
            <Typography variant="h5">{data.title}</Typography>
            <div className="flex space-x-2 text-slate-500">
              <Typography className="">AfroJazz</Typography>
              <Typography className="">
                {bp(8)}
                {users.length} Samples
              </Typography>
            </div>
          </div>
          <div className="Buttons  mb-[10px] space-x-8">
            <Button
              sx={{
                ":hover": {
                  bgcolor: "#AF50",
                  color: "#293d04",
                  boxShadow: "-2px -2px .5px #888888",
                },
                paddingX: 3,
                boxShadow: "none",
                textTransform: "none",
                color: "var(--binance_green)",
                backgroundColor: "var(--myGreen)",
                fontWeight: 500,
              }}
              variant="contained"
              color="primary"
            >
              <IconFolderPlus size={10} stroke={1} className="mr-1" />
              {"Add Pack"}
            </Button>
            <Button
              sx={{
                textTransform: "none",
                paddingX: 3,
                fontWeight: 500,
                color: "var(--lovelypink)",
                ":hover": {
                  color: "var(--binance_green)",
                  boxShadow: "-1px -1px .5px #ff6600",
                  border: "none",
                },
              }}
              variant="outlined"
              color="primary"
            >
              <IconPlayerPlay className="mr-1" size={10} />
              {"Preview"}
            </Button>
          </div>
        </div>
        <Typography className="flex flex-nowrap">
          {
            <IconHeartPlus
              size={25}
              className="hover:cursor-pointer hover:text-myYellow"
            />
          }
        </Typography>
      </section>
      <p className="flex  flex-wrap border-y-[1px] border-opacity-20 p-2 border-slate-900">
        African Jazz Groove is a vibrant and dynamic genre that combines the
        rich musical traditions of Africa with the improvisational spirit of
        jazz. It continues to evolve and inspire musicians around the world.
      </p>
      <section>
        <Typography className="p-2">Samples</Typography>
        <div className="flex flex-wrap">
          <FilterItem Label={"Instruments"} names={names} />
          <FilterItem Label={"Genre"} names={["AfroJazz"]} />
          <FilterKey Label={"Key"} names={[]} />
          <FilterSingle Label={"Type"} names={["Loops", "One-shots"]} />
          <FilterBpm Label={"BPM"} names={[]} />
        </div>
        <Samples samples={[]} />
        <div>
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <React.Fragment>
              <Users users={users} page={page} />
              <Pagination
                totalPages={totalPages}
                handleClick={handleClick}
                page={page}
              />
            </React.Fragment>
          )}
        </div>
      </section>
    </div>
  );
}
