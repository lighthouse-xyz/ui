import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const ScrollingDescription = styled(Typography)({
  display: "-webkit-box",
  overflowY: "auto",
  overflowX: "hidden",
  WebkitBoxOrient: "vertical",
  textOverflow: "clip",
  wordBreak: "break-word",
  maxHeight: "80px",
  paddingRight: "6px",
  "::-webkit-scrollbar": {
    width: "10px",
  },
  "::-webkit-scrollbar-track": {
    borderRadius: "10px",
    WebkitBoxShadow: "inset 0 0 3px rgba(0,0,0,0.3)",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export { ScrollingDescription };
