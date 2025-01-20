import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import { zIndexStep } from "@src/common/styles/style.const";

interface StyledBackdropProps {
  borderradius: string;
  backgroundcolor: string;
}

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({ borderradius, backgroundcolor }: StyledBackdropProps) => ({
  position: "absolute",
  zIndex: theme.zIndex.modal + zIndexStep,
  borderRadius: borderradius,
  backgroundColor: backgroundcolor,
}));

export { StyledBackdrop };
