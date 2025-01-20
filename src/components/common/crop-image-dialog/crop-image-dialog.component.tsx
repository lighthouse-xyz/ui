import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { useTranslation } from "react-i18next";

import DialogFrame from "../dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "../form-confirmation-buttons/form-confirmation-buttons.component";
import { CropContainer } from "./crop-image-dialog.style";
import { Slider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as GalleryIcon } from "@src/assets/icons/gallery-icon.svg";
import { MediaArea } from "@src/common/graphql/generated/discovery.schema.graphql";
import { MediaImage } from "@src/common/interfaces/media-image.type";
import { entityBannerRatio } from "@src/common/styles/style.const";
import { getCroppedImageUrl } from "@src/utils/get-cropped-image-url.util";

interface Props {
  mediaImage: MediaImage;
  ratio?: number;
  setMediaImage: (image?: MediaImage) => void;
  handleClose: () => void;
}

const CropImageDialog: React.FC<Props> = ({
  ratio = entityBannerRatio.number,
  mediaImage,
  setMediaImage,
  handleClose,
}) => {
  const dialogName = `crop-image-dialog`;

  const theme = useTheme();
  const { t } = useTranslation();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area>();

  const onApplyClick = async (): Promise<void> => {
    if (area) {
      const mediaArea: MediaArea = {
        height: area.height,
        width: area.width,
        top: area.y,
        left: area.x,
      };

      const croppedImageUrl = await getCroppedImageUrl(mediaImage.url, area);
      setMediaImage({ ...mediaImage, croppedArea: mediaArea, url: croppedImageUrl });
    }

    handleClose();
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setArea(croppedAreaPixels);
  }, []);

  return (
    <DialogFrame onClose={handleClose} aria-labelledby={`${dialogName}-title`}>
      <Stack padding={6} paddingBottom={0} spacing={6} justifyContent="center">
        <Typography variant="h6" id={`${dialogName}-title`}>
          {t("form.title.crop")}
        </Typography>
        <CropContainer position="relative" width="100%" height="220px">
          <Cropper
            image={mediaImage.url}
            crop={crop}
            zoom={zoom}
            aspect={ratio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </CropContainer>
        <Stack spacing={4} direction="row" alignItems="center">
          <GalleryIcon color={theme.palette.action.active} height="24px" width="24px" />
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(_event, newZoom) => setZoom(Number(newZoom))}
          />
          <GalleryIcon color={theme.palette.action.active} height="33px" width="33px" />
        </Stack>
      </Stack>
      <Stack paddingX={6}>
        <FormConfirmationButtons
          confirmButtonProps={{ label: t("cta.apply"), onClick: () => void onApplyClick() }}
          cancelButtonProps={{ label: t("cta.back"), onClick: handleClose }}
        />
      </Stack>
    </DialogFrame>
  );
};

export default CropImageDialog;
