import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { pageLayout } from "@src/common/styles/style.const";

interface MiddleContainerProps {
  marginLeft: string;
}

const PageContainer = styled("div")({
  display: "flex",
  paddingTop: pageLayout.paddingTop,

  "> .MuiContainer-root": {
    padding: `0 ${pageLayout.columnGap}`,
  },
});

const MiddleContainer = styled("div")(({ marginLeft }: MiddleContainerProps) => ({
  minWidth: "440px",
  paddingTop: "40px",
  marginLeft,
  overflowX: "hidden",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "flex-start",
  flexGrow: 1,
  width: "100%",
}));

const FooterContainer = styled(Box)({
  marginTop: "auto",
});

export { FooterContainer, MiddleContainer, PageContainer };
