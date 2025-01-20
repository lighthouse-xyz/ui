import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const ChapterNumber = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #FFFFFF",
  borderRadius: "106px",
  color: "white",
});

const ChapterImage = styled("img")({
  width: "100%",
  height: "100%",
  borderRadius: "24px",
  maxHeight: "834px",
  maxWidth: "1280px",
  objectFit: "cover",
  objectPosition: "50% 100%",
  aspectRatio: "1.535",
});

const NextButton = styled(IconButton)({
  borderRadius: "106px",
  color: "white",
  border: "1px solid #FFFFFF",
});

export { ChapterImage, ChapterNumber, NextButton };
