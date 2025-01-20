import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import akuBgImage from "@src/assets/images/aku-landscape-image.webp";

const AkuLandingPageContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: "#1C1A1B",

  button: { borderRadius: "24px" },
  ".MuiTypography-root": {
    fontFamily: "FK Grotesk Neue",
  },
  ".MuiContainer-root": {
    padding: "0 24px",
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const BottomImage = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
  backgroundImage: `url(${akuBgImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
});

export { AkuLandingPageContainer, BottomImage };
