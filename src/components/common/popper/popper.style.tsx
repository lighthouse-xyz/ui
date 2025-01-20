import { Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

const StyledPopper = styled(Popper)(({ theme }) => ({
  position: "relative",
  visibility: "hidden",
  borderRadius: borderRadius.default,
  // eslint-disable-next-line no-magic-numbers
  boxShadow: theme.shadows[6],

  "&[data-show='true']": {
    visibility: "visible",
  },

  ".arrow, .arrow::before": {
    position: "absolute",
    width: "8px",
    height: "8px",
    background: theme.palette.primary.main,
    transition: "top 0.3s ease-in, bottom 0.3s ease-in, left 0.3s ease-in, right 0.3s ease-in",
  },

  ".arrow": {
    visibility: "hidden",
  },

  ".arrow::before": {
    visibility: "visible",
    content: '""',
    transform: "rotate(45deg)",
  },

  "&[data-popper-placement^='top'] > .arrow": {
    bottom: "-4px",
  },

  "&[data-popper-placement^='bottom'] > .arrow": {
    top: "-4px",
  },

  "&[data-popper-placement^='left'] > .arrow": {
    right: "-4px",
  },

  "&[data-popper-placement^='right'] > .arrow": {
    left: "-4px",
  },
}));

export { StyledPopper };
