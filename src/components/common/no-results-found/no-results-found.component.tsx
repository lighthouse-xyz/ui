import React from "react";

import moonImage from "../../../assets/images/moon-image.svg";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  subtitle?: string;
  button?: JSX.Element;
  marginTop?: string;
  size?: "small" | "large";
}

const NoResultsFound: React.FC<Props> = ({ title, subtitle, button, marginTop, size = "small" }) => {
  // eslint-disable-next-line no-magic-numbers
  const spacing = size === "small" ? 2 : 4;
  const width = size === "small" ? "320px" : "485px";
  const heightImage = size === "small" ? "200px" : "290px";
  const defaultMarginTop = size === "small" ? "60px" : "100px";
  const typoTitle = size === "small" ? "h7" : "h5";

  return (
    <Stack justifyContent="center" alignItems="center" spacing={spacing} marginTop={marginTop || defaultMarginTop}>
      <Box component="img" src={moonImage} width={width} height={heightImage} />
      <Stack textAlign="center" spacing={spacing} width={width}>
        <Typography variant={typoTitle}>{title}</Typography>
        {!!subtitle && (
          <Typography variant="body1" color="text.secondary" whiteSpace="pre-line">
            {subtitle}
          </Typography>
        )}
        {!!button && <Box alignSelf="center">{button}</Box>}
      </Stack>
    </Stack>
  );
};

export default NoResultsFound;
