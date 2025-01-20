import { Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props extends Omit<SwitchProps, "size"> {
  customsize: "small" | "medium" | "large";
}

/* eslint-disable no-magic-numbers */
const SwitchStyled = styled(Switch)(({ theme }) => ({ customsize }: Props) => (props: SwitchProps) => ({
  width: customsize === "small" ? 26 : customsize === "medium" ? 34 : 42,
  height: customsize === "small" ? 16 : customsize === "medium" ? 20 : 26,
  padding: 0,

  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: `translateX(${customsize === "small" ? 10 : customsize === "medium" ? 14 : 16}px)`,
      color: theme.palette.primary.main,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: customsize === "small" ? 12 : customsize === "medium" ? 16 : 22,
    height: customsize === "small" ? 12 : customsize === "medium" ? 16 : 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    opacity: 0.5,
    backgroundColor: props.color === "primary" || !props.color ? theme.palette.grey[500] : theme.palette.grey[50],
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },

  "& .MuiSwitch-colorSecondary": {
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.grey[50],
    },
  },
}));
/* eslint-enable no-magic-numbers */

export { SwitchStyled };
