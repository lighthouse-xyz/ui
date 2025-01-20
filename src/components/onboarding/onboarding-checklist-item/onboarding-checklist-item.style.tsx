import React from "react";

import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 161,
  },
});

export { CustomWidthTooltip };
