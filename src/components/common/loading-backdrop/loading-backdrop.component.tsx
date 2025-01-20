import React from "react";

import { StyledBackdrop } from "./loading-backdrop.style";
import { useTheme } from "@mui/material";

interface Props {
  open: boolean;
  loadingIndicator?: JSX.Element;
  borderRadius?: string;
  backgroundColor?: string;
}

const LoadingBackdrop: React.FC<Props> = ({ open = false, loadingIndicator, borderRadius = "0", backgroundColor }) => {
  const theme = useTheme();

  const backgroundColorSelected = backgroundColor || theme.palette.background.transparent;

  return (
    <StyledBackdrop open={open} borderradius={borderRadius} backgroundcolor={backgroundColorSelected}>
      {loadingIndicator}
    </StyledBackdrop>
  );
};

export default LoadingBackdrop;
