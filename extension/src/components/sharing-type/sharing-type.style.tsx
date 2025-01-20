import { styled } from "@mui/material/styles";

const DropdownMenuWrapper = styled("div")(({ theme }) => ({
  button: {
    justifyContent: "space-between",
    fontWeight: 400,
    letterSpacing: "0.17px",
    color: "rgba(0,0,0,0.87)",
    background: theme.palette.action.hover,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      background: theme.palette.action.hover,
    },
  },
}));

export { DropdownMenuWrapper };
