import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

interface ButtonProps {
  bgcoloronhover: string;
}

const StartExploringButton = styled(Button)(({ bgcoloronhover }: ButtonProps) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: borderRadius.large,

  ":hover": {
    backgroundColor: bgcoloronhover,
  },
}));

export { StartExploringButton };
