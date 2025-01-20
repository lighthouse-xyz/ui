import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getPalette } from "@src/common/styles/palette";

const ContainerWrapper = styled(Box)({
  ".MuiContainer-root": {
    padding: "0",
  },
});

const ScrollMenuContainer = styled(Box)({
  overflow: "hidden",
  ".react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar": {
    display: "none",
  },

  ".react-horizontal-scrolling-menu--scroll-container": {
    overflow: false,
    columnGap: "18px",
    padding: "12px",
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
  },

  ".react-horizontal-scrolling-menu--item": {
    height: "100%",
    cursor: "pointer",
    transition: "transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s",
    ":hover": {
      transform: `scale(1.04)`,
    },
  },

  button: {
    border: "1px solid #FFFFFF",
  },

  svg: {
    color: getPalette("dark").palette.action?.active,
  },
  ".Mui-disabled": {
    svg: {
      color: getPalette("dark").palette.action?.disabled,
    },
  },
});

export { ContainerWrapper, ScrollMenuContainer };
