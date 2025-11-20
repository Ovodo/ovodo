"use client";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Close from "./Close";
import { useState } from "react";
import { selectStyles } from "../data/variables";
import { IconButton } from "@mui/material";
import { ArrowDropDown, Clear } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const flat = () => {
  return <>&#9837;</>;
};

const sharp = () => {
  return <>&#9839;</>;
};

const keys = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  `C#/D`,
  "D#/E",
  "F#/G",
  "G#/A",
  "A#/B",
];

interface FilterKeyProps {
  Label: string;
  names: string[];
}

const FilterKey: React.FC<FilterKeyProps> = ({ Label, names }) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const [key, setKey] = useState<string>("");
  const [showSelect, setShowSelect] = useState(false);
  const [majmin, setMajmin] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : (value as string[])
    );
  };

  return (
    <div>
      <FormControl sx={selectStyles} size="small">
        <InputLabel className="font-bold" id="demo-multiple-checkbox-label">
          {Label}
        </InputLabel>
        <Select
          open={showSelect}
          onOpen={() => setShowSelect(true)}
          onClose={() => setShowSelect(false)}
          className="text-center"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={key + majmin}
          renderValue={(selected) => selected}
          input={<OutlinedInput label={Label} />}
          MenuProps={MenuProps}
          endAdornment={
            <IconButton
              disableRipple
              sx={{
                position: "relative",
                right: "7px",
              }}
              onClick={() => {
                setKey("");
                setMajmin("");
              }}
            >
              {!key && !majmin ? (
                <ArrowDropDown
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                  }}
                />
              ) : (
                <Clear
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "700",
                  }}
                />
              )}
            </IconButton>
          }
        >
          <div className="p-1 flex flex-wrap ">
            {keys.map((entry) =>
              entry.includes("#") ? (
                <p
                  key={entry}
                  onClick={(e) => {
                    setKey(e.currentTarget.innerText);
                  }}
                  style={{
                    backgroundColor: key.includes(entry)
                      ? "var(--myGreen)"
                      : undefined,
                    color: key.includes(entry) ? "var(--myYellow)" : undefined,
                  }}
                  className="hover:text-myYellow hover:bg-myGreen hover:bg-opacity-70 transition duration-500 cursor-pointer mr-2 mb-2 rounded-sm inline-flex font-semibold px-2 py-1 border-[1px] border-slate-700 border-opacity-30"
                >
                  {entry}
                  {flat()}
                </p>
              ) : (
                <p
                  key={entry}
                  onClick={(e) => {
                    setKey(e.currentTarget.innerText);
                  }}
                  style={{
                    backgroundColor:
                      entry === key ? "var(--myGreen)" : undefined,
                    color: entry === key ? "var(--myYellow)" : undefined,
                  }}
                  className="hover:text-myYellow hover:bg-myGreen hover:bg-opacity-70 transition duration-500 cursor-pointer mr-2 mb-2 rounded-sm inline-flex font-semibold px-2 py-1 border-[1px] border-slate-700 border-opacity-30"
                >
                  {entry}
                </p>
              )
            )}
          </div>
          <div className="flex justify-center">
            <p
              onClick={(e) => {
                setMajmin("Maj");
              }}
              style={{
                backgroundColor:
                  majmin === "Maj" ? "var(--myGreen)" : undefined,
                color: majmin === "Maj" ? "var(--myYellow)" : undefined,
              }}
              className="hover:text-myYellow hover:bg-myGreen hover:bg-opacity-70
            transition duration-500 cursor-pointer mr-2 mb-2 rounded-sm
            inline-flex font-semibold px-7 py-1 border-[1px] border-slate-700
            border-opacity-30"
            >
              Major
            </p>
            <p
              onClick={(e) => {
                setMajmin("m");
              }}
              style={{
                backgroundColor: majmin === "m" ? "var(--myGreen)" : undefined,
                color: majmin === "m" ? "var(--myYellow)" : undefined,
              }}
              className="hover:text-myYellow hover:bg-myGreen hover:bg-opacity-70
            transition duration-500 cursor-pointer mr-2 mb-2 rounded-sm
            inline-flex font-semibold px-7 py-1 border-[1px] border-slate-700
            border-opacity-30"
            >
              Minor
            </p>
          </div>
          <Close
            clear={() => {
              setKey("");
              setMajmin("");
            }}
            close={() => {
              setShowSelect(false);
            }}
          />
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterKey;
