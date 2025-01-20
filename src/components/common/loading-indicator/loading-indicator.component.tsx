import React from "react";

import { LoadingAnimation, LoadingContainer } from "./loading-indicator.style";
import loadingIndicator from "@src/assets/lotties/loading-indicator.json";

interface Props {
  size?: string;
  background?: string;
}

const LoadingIndicator: React.FC<Props> = ({ size = "70px", background = "transparent" }) => {
  return (
    <LoadingContainer elevation={0} background={background}>
      <LoadingAnimation autoplay loop src={loadingIndicator} size={size}></LoadingAnimation>
    </LoadingContainer>
  );
};

export default LoadingIndicator;
