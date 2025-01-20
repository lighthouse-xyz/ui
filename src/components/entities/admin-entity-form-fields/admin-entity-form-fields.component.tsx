import React from "react";
import { useTranslation } from "react-i18next";

import { Stack, Typography } from "@mui/material";
import { ImageContext, ImageFormat } from "@src/common/enums/image.enum";
import { MediaImage } from "@src/common/interfaces/media-image.type";
import ImageSelector from "@src/components/common/image-selector/image-selector.component";
import { TextFieldProps } from "@src/hooks/utils/use-create-form/use-create-form.interface";

interface Props {
  createTextField: (props: TextFieldProps) => JSX.Element;
  mediaImage?: MediaImage | null;
  setMediaImage: (image?: MediaImage | null) => void;
  includeMarketplace?: boolean;
}

const AdminEntityFormFields: React.FC<Props> = ({ createTextField, mediaImage, setMediaImage, includeMarketplace }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <Typography variant="h7">{t("godMode.form.heading")}</Typography>
      {createTextField({
        varName: "ownerUser",
        required: true,
        placeholder: t("godMode.form.ownerUser"),
        placeholderAsLabel: true,
      })}

      {includeMarketplace &&
        createTextField({
          varName: "marketplace",
          placeholder: t("godMode.form.marketplace"),
          placeholderAsLabel: true,
        })}

      <ImageSelector
        mediaImage={mediaImage}
        setMediaImage={setMediaImage}
        imageProps={{ format: ImageFormat.square, context: ImageContext.entity }}
        label={t("godMode.form.featuredMedia")}
      />
    </Stack>
  );
};

export default AdminEntityFormFields;
