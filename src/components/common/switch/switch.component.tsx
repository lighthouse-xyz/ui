import React from "react";

import { SwitchStyled } from "./switch.style";
import { SwitchProps } from "@mui/material/Switch";

interface Props extends Omit<SwitchProps, "size"> {
  size?: "small" | "medium" | "large";
}

const Switch: React.FC<Props> = ({ size = "medium", ...props }) => {
  return <SwitchStyled customsize={size} {...props} />;
};

export default Switch;
