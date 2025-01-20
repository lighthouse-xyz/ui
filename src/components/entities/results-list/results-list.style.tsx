import { styled } from "@mui/material/styles";
import { CardSize } from "@src/common/enums/card-size.enum";
import { entityCardStyle } from "@src/common/styles/style.const";

const ListEntitiesContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: entityCardStyle.betweenCardsGap,
  padding: "7px",
  overflow: "hidden",

  "div.MuiPaper-root": {
    flex: `1 0 calc(${entityCardStyle.sizeProperties(CardSize.small).minWidth} - calc(${
      entityCardStyle.betweenCardsGap
    } / 2))`,
  },
});

export { ListEntitiesContainer };
