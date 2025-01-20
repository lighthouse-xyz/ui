import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import claimHandleImage from "@src/assets/images/claim-handle-image.svg";
import { backgroundZIndex } from "@src/common/styles/style.const";

const PageContainer = styled("div")({
  overflowX: "hidden",
  overflowY: "visible",
  whiteSpace: "pre-line",

  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "flex-start",

  ".swiper": {
    width: "100%",
    height: "100%",
  },

  ".MuiContainer-root": {
    padding: "0 32px",
  },
});

const Image = styled(Box)({
  position: "absolute",
  left: "0",
  top: "0",
  height: "100%",
  width: "50%",
  minHeight: "805px",
  backgroundImage: `url(${claimHandleImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  zIndex: backgroundZIndex,
});

export { Image, PageContainer };
