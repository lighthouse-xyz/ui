import { TextFieldElement } from "react-hook-form-mui";

import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getPalette } from "@src/common/styles/palette";

const StyledTextField = styled(TextFieldElement)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "40px",
    borderColor: theme.palette.common.white,

    height: "56px",
    "& fieldset": {
      borderColor: theme.palette.common.white,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.common.white,
    },
    "&:hover:not(.Mui-disabled) fieldset": {
      borderColor: theme.palette.common.white,
    },
    "&.Mui-disabled": {
      fieldset: {
        border: "none",
      },
      backgroundColor: getPalette("dark").palette.action?.disabledBackground,
    },
    ".MuiOutlinedInput-input.Mui-disabled": {
      color: getPalette("dark").palette.action?.disabled,
      WebkitTextFillColor: getPalette("dark").palette.action?.disabled,
    },
  },

  "&.MuiTextField-root": {
    flexGrow: 1,
    color: theme.palette.common.white,
  },

  "& .MuiOutlinedInput-input": {
    padding: "0 24px",
    color: theme.palette.common.white,
  },
}));

const SuccessButton = styled(IconButton)(({ theme }) => ({
  cursor: "default",
  borderRadius: "106px",
  width: "56px",
  height: "56px",
  border: "1px solid #FFFFFF",
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
}));

const CheckButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "106px",
  padding: "0px",
  width: "56px",
  height: "56px",
  border: "1px solid #FFFFFF",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: getPalette("dark").palette?.action?.hover,
  },
  "&.Mui-disabled": {
    color: getPalette("dark").palette.action?.disabled,
    backgroundColor: getPalette("dark").palette.action?.disabledBackground,
    border: "none",
  },
  ".MuiCircularProgress-svg": {
    color: getPalette("dark").palette.action?.disabled,
  },
}));

export { CheckButton, StyledTextField, SuccessButton };
