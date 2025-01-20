import { AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

interface AppBarProps {
  minwidth: string;
}

const AppBarContainer = styled(AppBar)(({ minwidth }: AppBarProps) => ({
  minWidth: minwidth,
  left: "0",

  ".MuiContainer-root": {
    padding: "0",
  },
}));

export { AppBarContainer };
