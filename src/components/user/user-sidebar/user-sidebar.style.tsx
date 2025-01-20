import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { pageLayout } from "@src/common/styles/style.const";

const UserSidebarContainer = styled(Stack)(({ theme }) => ({
  paddingLeft: pageLayout.drawerPaddingX,
  maxWidth: pageLayout.drawerWidth,

  ".MuiButton-endIcon": {
    marginLeft: "0",
    width: "40px",
    color: theme.palette.action.active,
  },

  ".MuiTypography-root": {
    maxWidth: "116px",
    paddingRight: "2px",
  },
}));

export { UserSidebarContainer };
