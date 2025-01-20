import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

export const heightImageSection = "276px";

const StyledImg = styled("img")({
  position: "absolute",
  objectFit: "cover",
  color: "transparent",
  borderTopRightRadius: borderRadius.default,
  borderTopLeftRadius: borderRadius.default,
});

const Video = styled("video")(({ theme }) => ({
  position: "absolute",
  objectFit: "cover",
  minWidth: "100%",
  height: heightImageSection,
  backgroundColor: theme.palette.background.starVideoFallback,
  borderTopRightRadius: borderRadius.default,
  borderTopLeftRadius: borderRadius.default,
}));

export { StyledImg, Video };
