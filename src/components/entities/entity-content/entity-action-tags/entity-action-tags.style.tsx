import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const SecondIconFromRight = styled(Box)({
  position: "absolute",
  bottom: "8px",
  right: "52px",
});

const FirstIconFromRight = styled(Box)({
  position: "absolute",
  bottom: "8px",
  right: "20px",
});

const FirstButtonFromLeft = styled(Box)({
  position: "absolute",
  bottom: "10px",
  left: "16px",
});

export { FirstButtonFromLeft, FirstIconFromRight, SecondIconFromRight };
