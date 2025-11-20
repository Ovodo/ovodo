"use client";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

interface FilterItemProps {
  Label: string;
  names: string[];
}

const FilterItem: React.FC<FilterItemProps> = ({ Label, names }) => {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const [showSelect, setShowSelect] = useState(false);

  return (
    <div>
      <FormControl sx={selectStyles} size="small">
        <InputLabel id="demo-multiple-checkbox-label">{Label}</InputLabel>
        <Select
          className="text-center"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          open={showSelect}
          onOpen={() => setShowSelect(true)}
          onClose={() => setShowSelect(false)}
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={Label} />}
          renderValue={(selected) => selected.length}
          MenuProps={MenuProps}
          endAdornment={
            <IconButton
              disableRipple
              sx={{
                position: "relative",
                right: "7px",
                bottom: "0px",
              }}
              onClick={() => {
                personName.length !== 0
                  ? setPersonName([])
                  : setShowSelect(true);
              }}
            >
              {personName.length === 0 ? (
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
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText
                sx={{ fontSize: "2px" }}
                className="flex items-center"
                primary={name}
                secondary={"ui"}
              />
            </MenuItem>
          ))}
          <Close
            clear={() => {
              setPersonName([]);
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

export default FilterItem;
