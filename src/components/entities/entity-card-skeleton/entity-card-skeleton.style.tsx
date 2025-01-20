import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { CardSize } from "@src/common/enums/card-size.enum";
import { entityCardStyle } from "@src/common/styles/style.const";

interface CardProps {
  cardsize: CardSize;
}

const CardSkeleton = styled(Skeleton)(({ cardsize }: CardProps) => ({
  borderRadius: entityCardStyle.borderRadius,
  height: "100%",
  ...entityCardStyle.sizeProperties(cardsize),
}));

const ContentSkeleton = styled(Stack)({
  marginTop: entityCardStyle.imageContentGap,
});

const TextSkeleton = styled(Skeleton)({
  flexGrow: 0.5,
  lineHeight: 1,
});

export { CardSkeleton, ContentSkeleton, TextSkeleton };
