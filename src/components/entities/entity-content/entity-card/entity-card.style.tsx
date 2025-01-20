import { Divider, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { CardSize } from "@src/common/enums/card-size.enum";
import { entityCardStyle } from "@src/common/styles/style.const";

interface CardProps {
  cardsize: CardSize;
  context: "carousel" | "list";
  vrmode: number;
}

/* eslint-disable no-magic-numbers */
const EntityCardContainer = styled(Paper)(({ theme }) => ({ cardsize, context, vrmode }: CardProps) => {
  const columnGap = `calc(${entityCardStyle.betweenCardsGap} / 2)`;
  const maxWidth = (cardsPerRow: number): string => `calc(calc(100% / ${cardsPerRow}) - ${columnGap} - 4px)`;

  const responsiveMaxWidth =
    context === "list"
      ? {
          maxWidth: maxWidth(2),
          [theme.breakpoints.up(vrmode ? "threeCardsVr" : "threeCards")]: {
            maxWidth: maxWidth(3),
          },
          [theme.breakpoints.up(vrmode ? "fourCardsVr" : "fourCards")]: {
            maxWidth: maxWidth(4),
          },
          [theme.breakpoints.up(vrmode ? "fiveCardsVr" : "fiveCards")]: {
            maxWidth: maxWidth(5),
          },
        }
      : {
          maxWidth: cardsize === CardSize.small ? "240px" : `calc(100% - ${columnGap})`,
        };

  return {
    ...responsiveMaxWidth,
    background: "transparent",
  };
});
/* eslint-enable no-magic-numbers */

const ActionsBarOverlay = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  bottom: "0",
  left: "0",
  background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
  borderRadius: entityCardStyle.borderRadius,
  cursor: "pointer",
});

const CardActionsContainer = styled(Box)({
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  padding: "10px 16px",
});

const CardDivider = styled(Divider)(({ theme }) => ({
  width: "120px",
  background: theme.palette.common.white,
}));

const DateSection = styled(Stack)({
  span: {
    wordBreak: "break-word",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  },
});

export { ActionsBarOverlay, CardActionsContainer, CardDivider, DateSection, EntityCardContainer };
