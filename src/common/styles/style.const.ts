import { CardSize } from "../enums/card-size.enum";

const borderRadius = {
  theme: 16,
  default: "16px",
  xsmall: "4px",
  small: "12px",
  medium: "32px",
  large: "64px",
};

const pageLayout = {
  columnGap: "40px",
  drawerWidth: "240px",
  drawerFullWidth: "280px", // drawerWidth + columnGap
  drawerPaddingX: "24px",
  paddingTop: "24px",
  drawerPositionFromTopAppBar: "96px",
  drawerPositionFromTop: "120px", // drawerPositionFromTopAppBar + paddingTop
};

const tabMaxWidth = "213px";
const tabMinWidth = "100px";

const entitiesResultLayout = {
  titleContentGap: 8,
  filtersCardsGap: 10,
  itemsPerPage: 20,
};

const entityCardStyle = {
  borderRadius: borderRadius.medium,
  imageContentGap: "12px",
  betweenCardsGap: "24px",
  sizeProperties: (cardSize: CardSize) => {
    const largeSizeProperties = {
      width: "100%",
      minWidth: "274px",
      maxWidth: "416px",
      aspectRatio: cardSize === CardSize.large ? "1/1.218" : "1",
    };

    const smallSizeProperties = {
      width: "100%",
      minWidth: "200px",
      maxWidth: "240px",
      aspectRatio: "1",
    };

    return cardSize === CardSize.small ? smallSizeProperties : largeSizeProperties;
  },
  hoverAnimation: (cardSize: CardSize) => {
    const scale = cardSize === CardSize.small ? "1.06" : "1.03";

    return {
      transition: "transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s",
      ":hover": {
        transform: `scale(${scale})`,
      },
    };
  },
};

const zIndexStep = 100;
const backgroundZIndex = -1;

const defaultMaxTags = 10;

const profileBannerRatio = {
  value: "3.24/1",
  number: 3.24,
  text: "1096 x 338 pixels (3.24:1 ratio)",
};
const entityBannerRatio = {
  value: "2.15/1",
  number: 2.15,
  text: "1236 x 576 pixels (2.15:1 ratio)",
};

const totalConnectionsLimitForSidePanel = 100;

export {
  backgroundZIndex,
  borderRadius,
  defaultMaxTags,
  entitiesResultLayout,
  entityBannerRatio,
  entityCardStyle,
  pageLayout,
  profileBannerRatio,
  tabMaxWidth,
  tabMinWidth,
  totalConnectionsLimitForSidePanel,
  zIndexStep,
};
