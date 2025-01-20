import { Breakpoint, Dialog } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

interface CloseButtonProps {
  width: Breakpoint;
}

const closeButtonSize = "48px";

const StyledDialog = styled(Dialog)({
  ".MuiDialog-paper": {
    overflowY: "visible",
  },
  ".MuiDialog-container": {
    maxHeight: "90%",
    margin: "40px",
  },

  ".MuiFormHelperText-root": {
    textAlign: "right",
  },
});

const CloseButton = styled(IconButton)(({ theme }) => ({ width }: CloseButtonProps) => ({
  position: "absolute",
  backgroundColor: theme.palette.background.default,
  width: closeButtonSize,
  height: closeButtonSize,
  left: theme.breakpoints.values[width],
  top: `-${closeButtonSize}`,
  borderRadius: borderRadius.default,
  ":hover": {
    backgroundColor: theme.palette.background.transparent,
  },
}));

export { CloseButton, StyledDialog };
