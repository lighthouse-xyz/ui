import { Box, Stepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

interface StyledStepperProps {
  smallview: string;
}

interface BlackRoundedBoxProps {
  placement: "bottom" | "top";
}

const SectionContainer = styled(Box)(({ theme }) => () => {
  const contrastColor = theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white;

  return {
    position: "relative",

    button: {
      height: "48px",
      borderColor: contrastColor,
      color: contrastColor,
      maxWidth: "fit-content",
      "&:hover": {
        borderColor: contrastColor,
      },
    },
  };
});

const StyledStepper = styled(Stepper)(({ theme }) => ({ smallview }: StyledStepperProps) => ({
  ".MuiStepContent-root": {
    borderColor: theme.palette.divider,
    border: smallview === "true" ? "none" : undefined,
    paddingLeft: smallview === "true" ? "0px" : "60px",
    marginLeft: smallview === "true" ? "0px" : "32px",
    maxWidth: "560px",
  },
  ".MuiStepConnector-lineVertical": {
    borderColor: theme.palette.divider,
    border: smallview === "true" ? "none" : undefined,
    marginLeft: "20px",
  },

  ".MuiStepIcon-root": {
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: borderRadius.large,
    width: "64px",
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    circle: {
      color: theme.palette.background.default,
    },
    text: {
      fill: theme.palette.text.primary,
      fontSize: "10px",
      fontWeight: 400,
    },
    "&.Mui-active": {
      color: theme.palette.background.default,
    },
  },
  ".MuiStepLabel-iconContainer": {
    paddingRight: "28px",
  },

  ".MuiStepLabel-vertical":
    smallview === "true"
      ? {
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: "32px",
          paddingBottom: "24px",
        }
      : {},
}));

const BlackRoundedBox = styled(Box)(({ placement }: BlackRoundedBoxProps) => ({
  backgroundColor: "#1C1A1B",
  height: "44px",
  width: "100%",
  position: "absolute",
  ...(placement === "bottom" ? { bottom: "0px" } : { top: "0px" }),
  left: "0px",
  borderRadius: placement === "bottom" ? "40px 40px 0px 0px" : "0px 0px 40px 40px",
}));

export { BlackRoundedBox, SectionContainer, StyledStepper };
