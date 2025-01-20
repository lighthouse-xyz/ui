import { Fab, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";

const FixedButton = styled(Fab)(({ theme }) => ({
  margin: "0px",
  marginLeft: "54px",
  top: "auto",
  bottom: "40px",
  left: "auto",
  position: "fixed",
  gap: "8px",
  background: theme.palette.primary.gradient,
}));

const StyledStepper = styled(Stepper)({
  ".MuiStepConnector-lineVertical": {
    border: "none",
  },
  ".MuiStepConnector-line": {
    minHeight: "0px",
  },
  ".MuiStepLabel-root": {
    paddingBottom: "0",
    paddingTop: "4px",
  },
});

export { FixedButton, StyledStepper };
