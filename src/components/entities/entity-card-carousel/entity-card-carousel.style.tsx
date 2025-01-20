import { isMobile } from "react-device-detect";

import { styled } from "@mui/material/styles";
import { CardSize } from "@src/common/enums/card-size.enum";
import { entityCardStyle } from "@src/common/styles/style.const";

interface ScrollMenuContainerProps {
  cardSize: CardSize;
}

const largeCardsPerRow = 3;
const smallCardsPerRow = 5;

const ScrollMenuContainer = styled("div")(({ cardSize }: ScrollMenuContainerProps) => () => {
  const columnGap = `calc(${entityCardStyle.betweenCardsGap} / 2)`;
  const cardsPerRow = cardSize === CardSize.small ? smallCardsPerRow : largeCardsPerRow;
  const minWidth = `calc(100% / ${cardsPerRow} -  ${columnGap})`;

  return {
    ".react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar": {
      display: "none",
    },

    ".react-horizontal-scrolling-menu--scroll-container": {
      padding: "7px",
      overflow: !isMobile && "hidden",
      columnGap: `calc(${entityCardStyle.betweenCardsGap} / 2)`,
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
    },

    ".react-horizontal-scrolling-menu--item": {
      maxWidth: entityCardStyle.sizeProperties(cardSize).maxWidth,
      flex: `1 0 ${minWidth}`,
    },
  };
});

export { ScrollMenuContainer };
