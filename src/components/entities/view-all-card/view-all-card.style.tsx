import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { CardSize } from "@src/common/enums/card-size.enum";
import { entityCardStyle } from "@src/common/styles/style.const";

interface CardProps {
  cardsize: CardSize;
}

const ViewAllCardContainer = styled(Paper)(({ cardsize }: CardProps) => ({
  position: "relative",
  backgroundColor: "transparent",
  ...entityCardStyle.sizeProperties(cardsize),
}));

const ViewAllWrapper = styled(Button)(({ cardsize }: CardProps) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: entityCardStyle.borderRadius,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...entityCardStyle.hoverAnimation(cardsize),
}));

export { ViewAllCardContainer, ViewAllWrapper };
