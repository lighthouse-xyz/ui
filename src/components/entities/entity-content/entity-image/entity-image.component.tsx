import React from "react";
import { useTranslation } from "react-i18next";

import { EventChip, ImageContainer, LightkeeperImageContainer } from "./entity-image.style";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { CardSize } from "@src/common/enums/card-size.enum";
import { UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import { borderRadius, entityCardStyle } from "@src/common/styles/style.const";
import Image from "@src/components/common/image/image.component";

interface Badges {
  liveEvent?: boolean;
  pastEvent?: boolean;
  userCategory?: UserCategory;
}

interface ImageProps {
  image: string;
  name: string;
  cardSize?: CardSize;
}

interface Props {
  userId?: string;
  imageProps: ImageProps;
  badges: Badges;
  context?: "details" | "card";
  isLightkeeper?: boolean;
  children?: React.ReactNode;
  onImageClick?: () => void;
}

const EntityImage: React.FC<Props> = ({
  userId,
  imageProps: { image, name, cardSize },
  badges,
  context = "card",
  isLightkeeper = false,
  children,
  onImageClick,
}) => {
  const { t } = useTranslation();

  // size for details dialog
  let size: { [key: string]: string } = {
    width: "100%",
    height: "192px",
  };
  if (cardSize && context === "card") {
    size = entityCardStyle.sizeProperties(cardSize);
    delete size.maxWidth;
  }

  const content = (
    <>
      <Image
        image={image}
        name={name}
        width="100%"
        height="100%"
        context={context}
        onClick={onImageClick}
        userId={userId}
      />
      <Stack direction="row" spacing={1} alignItems="center" position="absolute" left="16px" top="8px">
        {!!badges.userCategory && (
          <Chip
            variant="filled"
            size="small"
            label={t(`enum.userCategory.${badges.userCategory}`)}
            sx={{
              background: "rgba(0,0,0,0.1)",
              color: "white",
              backdropFilter: "blur(20px)",
              borderRadius: borderRadius.default,
            }}
          />
        )}
        {badges.liveEvent && (
          <EventChip
            variant="outlined"
            color="primary"
            size="small"
            label={t("events.type.live").toUpperCase()}
            fontWeight={600}
          />
        )}
        {badges.pastEvent && (
          <EventChip variant="outlined" color="secondary" size="small" label={t("events.type.pastSingular")} />
        )}
      </Stack>
      {children}
    </>
  );

  return isLightkeeper && !!cardSize ? (
    <LightkeeperImageContainer
      gradient="lightkeeper"
      position="relative"
      cardsize={cardSize}
      borderRadius={borderRadius.medium}
      sx={size}>
      {content}
    </LightkeeperImageContainer>
  ) : (
    <ImageContainer position="relative" cardsize={cardSize} context={context} sx={size}>
      {content}
    </ImageContainer>
  );
};

export default EntityImage;
