import React from "react";

import { JustifiedFormControlLabel } from "./toggle-section.style";
import { Typography } from "@mui/material";
import Switch from "@src/components/common/switch/switch.component";

interface Props {
  checked: boolean;
  setChecked: (value: boolean) => void;
  title: string;
}

const ToggleSection: React.FC<Props> = ({ checked, setChecked, title }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.checked;
    setChecked(newValue);
  };
  return (
    <JustifiedFormControlLabel
      control={<Switch checked={checked} size="small" onChange={handleChange} />}
      label={
        <Typography variant="subtitle2" color="primary">
          {title}
        </Typography>
      }
      labelPlacement="start"
    />
  );
};

export default ToggleSection;
