import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { pageLayout } from "@src/common/styles/style.const";

interface DrawerProps {
  width: string;
}

interface DividerProps {
  space: string;
}

const DrawerContainer = styled(Paper)(({ theme }) => ({ width }: DrawerProps) => ({
  position: "fixed",
  top: pageLayout.drawerPositionFromTop,
  boxSizing: "border-box",
  paddingRight: pageLayout.drawerPaddingX,
  textAlign: "center",
  flexShrink: 0,
  minWidth: width,
  zIndex: theme.zIndex.drawer,
  height: "100vh",
  overflowY: "auto",
}));

const DrawerDivider = styled(Divider)(({ space }: DividerProps) => ({
  margin: `${space} 0 0 0`,
  border: "none",
}));

const LighthouseImage = styled("img")({
  cursor: "pointer",
  alignSelf: "center",
});

export { DrawerContainer, DrawerDivider, LighthouseImage };
