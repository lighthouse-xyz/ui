import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { pageLayout } from "@src/common/styles/style.const";
import { useVrContext } from "@src/context/vr/vr-context";

interface LeftDrawerProps {
  width: string;
  fullWidth: string;
  collapsed: boolean;
}

function useLeftDrawer(): LeftDrawerProps {
  const theme = useTheme();
  const { vrMode } = useVrContext();

  const collapsedBreakpoint = vrMode ? "collapsedVr" : "collapsed";
  const collapsed = useMediaQuery(theme.breakpoints.down(collapsedBreakpoint));

  const leftDrawerWidth = collapsed ? "80px" : pageLayout.drawerWidth;
  const leftDrawerFullWidth = `calc(${leftDrawerWidth} + ${pageLayout.columnGap})`;

  return {
    width: leftDrawerWidth,
    fullWidth: leftDrawerFullWidth,
    collapsed,
  };
}

export default useLeftDrawer;
