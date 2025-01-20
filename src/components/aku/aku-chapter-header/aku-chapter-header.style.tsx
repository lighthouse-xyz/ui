import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getPalette } from "@src/common/styles/palette";

const ButtonsContainer = styled(Stack)(({ theme }) => ({
  button: {
    border: theme.palette.common.white,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    ":hover": {
      border: getPalette("light").palette.background?.transparent,
      backgroundColor: getPalette("light").palette.background?.transparent,
    },
    svg: {
      color: theme.palette.common.black,
    },
    "&.Mui-disabled": {
      border: "none",
      backgroundColor: getPalette("light").palette.background?.transparent,
      ":not(.MuiLoadingButton-loading)": {
        color: getPalette("light").palette.text?.disabled,
      },
    },
  },
}));

export { ButtonsContainer };
