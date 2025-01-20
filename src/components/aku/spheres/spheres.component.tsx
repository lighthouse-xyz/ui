import React from "react";

import Box, { BoxProps } from "@mui/material/Box";
import spheresImage from "@src/assets/images/aku-three-spheres-image.webp";

interface Props extends BoxProps {
  maxHeight: string;
  maxWidth: string;
}

const Spheres: React.FC<Props> = ({ maxHeight, maxWidth, ...props }) => {
  return (
    <Box alignItems="center" {...props}>
      <Box maxHeight={maxHeight} maxWidth={maxWidth}>
        <img src={spheresImage} width="100%" height="100%" />
      </Box>
    </Box>
  );
};

export default Spheres;
