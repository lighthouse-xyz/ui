import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import akuBgImage from "@src/assets/images/aku-gradient-image.webp";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${akuBgImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",

  button: {
    borderRadius: "24px",
  },
});

export { StyledBox };
