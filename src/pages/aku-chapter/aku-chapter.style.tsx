import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const AkuChapterPageContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: "#1C1A1B",

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

export { AkuChapterPageContainer };
