import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import akuBgImage from "@src/assets/images/aku-gradient-image.png";

const StyledBox = styled(Box)({
  width: "100%",
  backgroundImage: `url(${akuBgImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
});

export { StyledBox };
