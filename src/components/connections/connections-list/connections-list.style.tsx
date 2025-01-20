import React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface ConnectionsListContainerProps {
  gap: string;
}

const CollapseButton = styled(Button)({
  justifyContent: "space-between",
  paddingLeft: "4px",
  paddingRight: "4px",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

const DividerStyled = styled("span")(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

const TextCounter = styled(Typography)({
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  letterSpacing: "0.14px",
});

const ConnectionsListContainer = styled(Stack)(({ gap }: ConnectionsListContainerProps) => ({
  rowGap: gap,
}));

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 192,
  },
});

export { CollapseButton, ConnectionsListContainer, CustomWidthTooltip, DividerStyled, TextCounter };
