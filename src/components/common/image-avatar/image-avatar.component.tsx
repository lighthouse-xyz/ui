import React from "react";

import { StyledAvatar, StyledBadge } from "./image-avatar.style";
import { colors } from "@mui/material";
import { defaultEntityImage } from "@src/assets/hosted-assets";
import { getDefaultUserImage } from "@src/utils/image-fallbacks.util";

export type SizeValue = "xsmall" | "small" | "smallMedium" | "medium" | "large" | "x-large";

interface Props {
  name?: string;
  userId?: string;
  image?: string;
  isOnline?: boolean;
  displayOffline?: boolean;
  size?: SizeValue;
  type: "user" | "entity";
}

const ImageAvatar: React.FC<Props> = ({
  name,
  userId,
  image,
  isOnline = false,
  displayOffline = false,
  size = "medium",
  type,
}) => {
  let imageDisplayed = image;

  if (!image) {
    imageDisplayed = type === "user" && userId ? getDefaultUserImage(userId) : defaultEntityImage;
  }

  const displayBadge = (!displayOffline && isOnline) || displayOffline;

  return (
    <StyledBadge
      // eslint-disable-next-line no-magic-numbers
      bgcolor={isOnline ? colors.teal.A400 : colors.grey[300]}
      invisible={!displayBadge}
      overlap="circular"
      variant="dot"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
      <StyledAvatar alt={name} src={imageDisplayed} size={size} />
    </StyledBadge>
  );
};

export default ImageAvatar;
