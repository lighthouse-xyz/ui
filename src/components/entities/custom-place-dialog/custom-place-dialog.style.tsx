import * as React from "react";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
  },
});

const SupportedWorldsText = styled(Typography)({
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
});

export { CustomWidthTooltip, SupportedWorldsText };
