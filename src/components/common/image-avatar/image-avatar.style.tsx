import { SizeValue } from "./image-avatar.component";
import { Badge } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { borderRadius } from "@src/common/styles/style.const";

interface BadgeProps {
  bgcolor: string;
}

interface AvatarProps {
  size: SizeValue;
}

function getPixelSize(size: SizeValue): string {
  switch (size) {
    case "xsmall":
      return "24px";
    case "small":
      return "32px";
    case "smallMedium":
      return "48px";
    case "medium":
      return "80px";
    case "large":
      return "120px";
    case "x-large":
      return "360px";
    default:
      return "80px";
  }
}

function getBorderRadius(size: SizeValue): string {
  switch (size) {
    case "xsmall":
      return "8px";
    case "small":
      return borderRadius.small;
    default:
      return borderRadius.default;
  }
}

const StyledAvatar = styled(Avatar)(({ size }: AvatarProps) => ({
  width: getPixelSize(size),
  height: getPixelSize(size),
  borderRadius: getBorderRadius(size),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({ bgcolor }: BadgeProps) => ({
  ".MuiBadge-dot": {
    border: `1px solid ${theme.palette.common.white}`,
    background: bgcolor,
  },
}));

export { getPixelSize, StyledAvatar, StyledBadge };
