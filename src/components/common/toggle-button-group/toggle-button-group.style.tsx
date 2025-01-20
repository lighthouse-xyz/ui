import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { borderRadius } from "@src/common/styles/style.const";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  background: theme.palette.action.hover,
  color: theme.palette.text.primary,
  gap: "8px",
  borderRadius: borderRadius.default,

  "& .MuiToggleButtonGroup-grouped": {
    margin: "4px",
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: borderRadius.default,
    },
    "&:first-of-type": {
      borderRadius: borderRadius.default,
    },
    "&.Mui-selected": {
      color: theme.palette.common.white,
      background: theme.palette.primary.light,
      ":hover": {
        background: theme.palette.primary.light,
      },
      svg: {
        color: theme.palette.common.white,
      },
    },
  },
}));

export { StyledToggleButtonGroup };
