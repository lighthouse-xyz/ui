import React from "react";

import Spheres from "../spheres/spheres.component";
import { StyledBox } from "./aku-header.style";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import cloundIcon from "@src/assets/icons/cloud-icon.svg";
import { ReactComponent as ArrowDown } from "@src/assets/icons/three-arrows-down-icon.svg";

interface Props {
  title: string | JSX.Element;
  subtitle: string;
  topContent: JSX.Element;
}

const AkuHeader: React.FC<Props> = ({ title, subtitle, topContent }) => {
  const theme = useTheme();

  const handleClickScroll = (): void => {
    const element = document.getElementById("section1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <StyledBox
      minHeight={{ xs: "700px", smMd: "800px" }}
      maxHeight={{ xs: "812px", smMd: "960px" }}
      color="common.white">
      <Box display="flex" position="absolute" top="32px" width="100%" paddingX="4vw" zIndex={theme.zIndex.appBar}>
        {topContent}
      </Box>

      <Stack
        justifyContent="center"
        textAlign="center"
        paddingTop={{ xs: typeof title === "string" ? "120px" : 0, smMd: 10 }}>
        <Typography fontSize="18px" lineHeight="24px" sx={{ textDecorationLine: "underline" }}>
          {subtitle}
        </Typography>
        <Box display="flex" justifyContent="center">
          <Box maxWidth="fit-content" position="relative">
            <Box
              component="img"
              width={{ xs: "20px", smMd: "41px" }}
              src={cloundIcon}
              position="absolute"
              right={typeof title === "string" ? { xs: "-10px", smMd: "-20px" } : { xs: "-20px", smMd: "-43px" }}
            />
            <Typography
              component="div"
              position="relative"
              fontSize={{ xs: "64px", smMd: "116px" }}
              lineHeight={{ xs: "82px", smMd: "148px" }}
              letterSpacing={{ xs: "-2px", smMd: "-5px" }}>
              {title}
            </Typography>
          </Box>
        </Box>

        <Spheres maxHeight="356px" maxWidth="1064px" paddingTop={4} paddingX={{ xs: 10, smMd: 16 }} />
      </Stack>
      <Stack
        position="absolute"
        alignSelf="flex-end"
        justifyContent="center"
        width={{ xs: "20px", smMd: "30px" }}
        height={{ xs: "42px", smMd: "52px" }}
        onClick={handleClickScroll}
        sx={{ cursor: "pointer" }}>
        <ArrowDown />
      </Stack>
    </StyledBox>
  );
};

export default AkuHeader;
