import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { CardSize } from "@src/common/enums/card-size.enum";
import { borderRadius, entityCardStyle } from "@src/common/styles/style.const";
import GradientBorder from "@src/components/common/gradient-border/gradient-border.component";

interface ChipProps {
  fontWeight?: number;
}

interface ImageContainerProps {
  cardsize?: CardSize;
  context: "card" | "details";
}

interface LightkeeperImageContainerProps {
  cardsize: CardSize;
}

const getCardStyle = (
  cardsize: CardSize,
  mode: PaletteMode,
): { [key: string]: string | { [key: string]: string } } => ({
  position: "relative",
  marginBottom: entityCardStyle.imageContentGap,
  borderRadius: entityCardStyle.borderRadius,
  ...entityCardStyle.hoverAnimation(cardsize),

  img: {
    borderRadius: entityCardStyle.borderRadius,
    boxShadow:
      mode === "dark"
        ? "rgba(0, 0, 0, 0.5) 0px 6px 20px -10px, rgba(0, 0, 0, 0.1) 0px 30px 20px -20px"
        : "rgba(0, 0, 0, 0.25) 0px 6px 20px -10px, rgba(136, 136, 136, 0.05) 0px 30px 20px -20px",
    cursor: "pointer",
  },

  ".MuiSkeleton-root": {
    borderRadius: entityCardStyle.borderRadius,
    cursor: "pointer",
  },
});

const LightkeeperImageContainer = styled(GradientBorder)(
  ({ theme }) =>
    ({ cardsize }: LightkeeperImageContainerProps) =>
      getCardStyle(cardsize, theme.palette.mode),
);

const ImageContainer = styled(Box)(
  ({ theme }) =>
    ({ cardsize, context }: ImageContainerProps) =>
      context === "card" && cardsize
        ? getCardStyle(cardsize, theme.palette.mode)
        : {
            img: {
              borderTopRightRadius: borderRadius.default,
              borderTopLeftRadius: borderRadius.default,
            },
            ".MuiBox-root": {
              borderTopRightRadius: borderRadius.default,
              borderTopLeftRadius: borderRadius.default,
            },
            ".MuiSkeleton-root": {
              borderTopRightRadius: borderRadius.default,
              borderTopLeftRadius: borderRadius.default,
            },
          },
);

const EventChip = styled(Chip)(({ fontWeight }: ChipProps) => ({
  ".MuiChip-label": {
    fontWeight,
  },
}));

export { EventChip, ImageContainer, LightkeeperImageContainer };
