import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { pageLayout } from "@src/common/styles/style.const";

const SidePanelContainer = styled(Paper)({
  position: "sticky",
  marginTop: pageLayout.drawerPositionFromTopAppBar,
  top: pageLayout.drawerPositionFromTop,
  paddingBottom: "95px",
  boxSizing: "border-box",
  marginLeft: pageLayout.columnGap,
  paddingLeft: pageLayout.drawerPaddingX,
  flexShrink: 0,
  width: pageLayout.drawerWidth,
  maxHeight: `calc(100vh - ${pageLayout.drawerPositionFromTop})`,
  overflowY: "auto",
  overflowX: "hidden",
});

export { SidePanelContainer };
