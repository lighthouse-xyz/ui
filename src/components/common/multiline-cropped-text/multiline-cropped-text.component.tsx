import React, { PropsWithChildren } from "react";

import { Typography, TypographyProps } from "@mui/material";

interface Props extends TypographyProps {
  maxlines: number;
}

const MultilineCroppedText: React.FC<PropsWithChildren<Props>> = ({ maxlines, children, ...props }) => {
  return (
    <Typography
      {...props}
      sx={{
        wordBreak: "break-word",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: String(maxlines),
        WebkitBoxOrient: "vertical",
        ...props.sx,
      }}>
      {children}
    </Typography>
  );
};

export default MultilineCroppedText;
