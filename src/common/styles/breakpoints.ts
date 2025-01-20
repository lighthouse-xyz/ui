import { Breakpoint } from "@mui/material/styles";

import { pageLayout } from "./style.const";

const appFullWidth = 1950;
const leftDrawerCollapsedBreakpoint = 1302;
const twoCards = 950;
const threeCards = 1142;
const fourCards = 1526;
const fiveCards = 1750;

const connectionsSidePanelWidth = Number(pageLayout.drawerFullWidth.replace("px", ""));
const totalOuterColumnGap = 2 * Number(pageLayout.columnGap.replace("px", ""));

const breakpoints: { [key in Breakpoint]: number } = {
  xs: 0,
  sm: 412,
  smMd: 524,
  mobile: 620,
  md: 744,
  mdLg: 1280,
  // breakpoint when left drawer collapsed
  collapsedVr: leftDrawerCollapsedBreakpoint - connectionsSidePanelWidth,
  collapsed: leftDrawerCollapsedBreakpoint,
  // max width for the appbar and footer + right side panel if not vr mode
  lgVr: appFullWidth - connectionsSidePanelWidth - totalOuterColumnGap,
  lg: appFullWidth - totalOuterColumnGap,
  // max width for the full app (including drawers)
  xlVr: appFullWidth - connectionsSidePanelWidth,
  xl: appFullWidth,
  twoCardsVr: twoCards - connectionsSidePanelWidth,
  twoCards,
  threeCardsVr: threeCards - connectionsSidePanelWidth,
  threeCards,
  fourCardsVr: fourCards - connectionsSidePanelWidth,
  fourCards,
  fiveCardsVr: fiveCards - connectionsSidePanelWidth,
  fiveCards,
  containedPage: 640,
};

export { breakpoints };
