import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface Props {
  gradient: string;
  borderradius: string;
  borderwidth: number;
}

const ContainerWithBorder = styled(Box)(({ theme }) => ({ gradient, borderradius, borderwidth }: Props) => ({
  zIndex: 3,
  border: `${borderwidth}px solid transparent`,
  backgroundClip: "padding-box",
  borderRadius: borderradius,

  img: {
    zIndex: 3,
    backgroundColor: theme.palette.background.paper,
  },
  ".MuiChip-root": {
    position: "relative",
    zIndex: 3,
  },
  ".MuiBadge-badge": {
    zIndex: 3,
  },
  div: {
    zIndex: 3,
  },

  "&:after": {
    position: "absolute",
    top: -borderwidth,
    left: -borderwidth,
    right: -borderwidth,
    bottom: -borderwidth,
    background: gradient,
    content: '""',
    zIndex: 2,
    borderRadius: borderradius,
  },
}));

export { ContainerWithBorder };
