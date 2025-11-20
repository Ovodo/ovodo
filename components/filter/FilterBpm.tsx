"use client";

import * as React from "react";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Close from "./Close";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { selectStyles } from "../data/variables";
import { ArrowDropDown, Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom" as const,
    horizontal: "left" as const,
  },
  transformOrigin: {
    vertical: "top" as const,
    horizontal: "left" as const,
  },
  getContentAnchorEl: null,
};

interface FilterBpmProps {
  Label: string;
  names: string[];
  show?: boolean;
}

const FilterBpm: React.FC<FilterBpmProps> = ({ Label, names, show }) => {
  const [personName, setPersonName] = useState<string[]>([]);
  const [bpm, setBpm] = useState<string>("");
  const [showSelect, setShowSelect] = useState(false);
  const [lowbpm, setLowbpm] = useState<number>(0);
  const [hibpm, setHibpm] = useState<number>(0);
  const [render, setRender] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setShowSelect(true);
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
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
          onClose={() => {}}
          IconComponent={!render ? ArrowDropDownIcon : CloseIcon}
          className="text-center"
          input={<OutlinedInput label={"BPM"} />}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          onChange={handleChange}
          value={personName}
          renderValue={(selected) => render}
          MenuProps={MenuProps}
          endAdornment={
            <IconButton
              disableRipple
              className="hover:bg-opacity-0"
              sx={{
                position: "relative",
                right: "7px",
                bottom: "0px",
              }}
              onClick={() => {
                render ? (setBpm(""), setRender("")) : setShowSelect(true);
              }}
            >
              {!render ? (
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
          <MenuItem
            key={"Exact"}
            value={"Exact"}
            className="flex items-center justify-end "
          >
            <Checkbox
              size="small"
              checked={personName[0] === "Exact"}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <ListItemText primary={"Exact"} />
            {personName[0] === "Exact" && (
              <OutlinedInput
                className="w-[25%] h-[25px] mr-20 "
                size="small"
                onChange={(e) => {
                  setBpm(e.target.value + "BPM ");
                }}
                type="number"
              />
            )}
          </MenuItem>
          <MenuItem
            key={"Range"}
            value={"Range"}
            className="flex items-center justify-start"
          >
            <Checkbox
              size="small"
              checked={personName[0] === "Range"}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <ListItemText primary={"Range"} />
            {personName[0] === "Range" && (
              <div className="flex ml-10">
                <OutlinedInput
                  className="w-[50%] h-[25px] text-left  "
                  size="small"
                  placeholder="Min"
                  onChange={(e) => {
                    setLowbpm(Number(e.target.value));
                    setBpm(`${lowbpm}-${hibpm}`);
                  }}
                />
                <p className="mx-1">-</p>
                <OutlinedInput
                  className="w-[50%] h-[25px] text-left  "
                  size="small"
                  placeholder="Max"
                  onChange={(e) => {
                    setHibpm(Number(e.target.value));
                    setBpm(`${lowbpm}-${hibpm}`);
                  }}
                />
              </div>
            )}
          </MenuItem>

          <Close
            text={"save"}
            clear={() => {
              setShowSelect(true);
              setBpm("");
              setRender("");
            }}
            close={() => {
              setShowSelect(false);
              setRender(bpm);
            }}
          />
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterBpm;
