import React from "react";
import { useTranslation } from "react-i18next";

import ImageBanner from "../image-banner/image-banner.component";
import { Box, Stack, Typography } from "@mui/material";
import { ImageContext, ImageFormat } from "@src/common/enums/image.enum";
import { MediaImage } from "@src/common/interfaces/media-image.type";
import { entityBannerRatio, profileBannerRatio } from "@src/common/styles/style.const";
import ImageAvatar from "@src/components/common/image-avatar/image-avatar.component";
import ImageSelectButtons from "@src/components/common/image-selector/image-select-buttons/image-select-buttons.component";

interface ImageProps {
  format: ImageFormat;
  context: ImageContext;
  username?: string;
  userId?: string;
}

interface Props {
  imageProps: ImageProps;
  label: string;
  mediaImage?: MediaImage | null;
  setMediaImage: (image?: MediaImage | null) => void;
}

const ImageSelector: React.FC<Props> = ({ imageProps, label, mediaImage, setMediaImage }) => {
  const { t } = useTranslation();

  const isBannerFormat = imageProps.format === ImageFormat.banner;
  const isEntityBanner = isBannerFormat && imageProps.context === ImageContext.entity;
  const bannerRatio = isBannerFormat ? (isEntityBanner ? entityBannerRatio : profileBannerRatio) : undefined;
  const ratio = isBannerFormat ? bannerRatio?.number : 1;

  return (
    <Stack spacing={6}>
      <Stack spacing={1}>
        <Typography variant="h7">{label}</Typography>
        <Typography variant="caption" color="text.secondary">
          {t(`form.helper.${imageProps.format}`, { bannerRatio: bannerRatio?.text })}
        </Typography>
      </Stack>
      {imageProps.format === ImageFormat.square ? (
        <Box alignSelf="center">
          <ImageAvatar
            image={mediaImage?.url}
            name={imageProps.username}
            userId={imageProps.userId}
            size={imageProps.context === ImageContext.entity ? "x-large" : "large"}
            type="user"
          />
        </Box>
      ) : (
        <ImageBanner image={mediaImage?.url} type={imageProps.context} size="small" />
      )}
      <ImageSelectButtons mediaImage={mediaImage} setMediaImage={setMediaImage} ratio={ratio} />
    </Stack>
  );
};

export default ImageSelector;
