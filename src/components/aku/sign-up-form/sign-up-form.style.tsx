import { PaletteMode, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getPalette } from "@src/common/styles/palette";

interface Props {
  colormode: PaletteMode;
}

const FormContent = styled(Stack)(({ colormode }: Props) => {
  const { palette } = getPalette(colormode);
  return {
    button: {
      borderRadius: "24px",
      borderColor: palette.text?.primary,
      color: palette.text?.primary,
      "&:hover": {
        borderColor: palette.text?.primary,
        backgroundColor: palette.action?.hover,
      },
      "&.Mui-disabled": {
        backgroundColor: palette.action?.disabledBackground,
        border: "none",
        ":not(.MuiLoadingButton-loading)": {
          color: palette.action?.disabled,
        },
      },
      svg: {
        color: palette.action?.disabled,
      },
    },

    "& .MuiOutlinedInput-root": {
      height: "56px",
      "& fieldset": {
        borderColor: palette.text?.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.text?.primary,
      },
      "&:hover fieldset": {
        borderColor: palette.text?.primary,
      },
    },

    "& .MuiTextField-root": {
      flexGrow: 1,
      borderColor: palette.text?.primary,
    },

    "& .MuiOutlinedInput-input": {
      color: palette.text?.primary,
    },

    ".MuiCheckbox-root": {
      borderColor: palette.text?.primary,
      color: palette.text?.primary,
      "&:hover": {
        backgroundColor: palette.action?.hover,
      },
      "&.Mui-checked": {
        color: palette.text?.primary,
      },
    },
  };
});

export { FormContent };
