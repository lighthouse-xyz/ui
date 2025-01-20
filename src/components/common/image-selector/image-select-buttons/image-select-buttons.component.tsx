import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploading, { ErrorsType, ImageListType } from "react-images-uploading";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { MediaImage, MediaType } from "@src/common/interfaces/media-image.type";
import { Nft } from "@src/common/interfaces/nft.interface";
import CropImageDialog from "@src/components/common/crop-image-dialog/crop-image-dialog.component";
import NftListDialog from "@src/components/user/nft-list-dialog/nft-list-dialog.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useToast, { NoWalletToastContentType } from "@src/hooks/utils/use-toast.hook";

interface Props {
  mediaImage?: MediaImage | null;
  ratio?: number;
  setMediaImage: (image?: MediaImage | null) => void;
}

const ImageSelectButtons: React.FC<Props> = ({ mediaImage, ratio, setMediaImage }) => {
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });
  const { showNoWalletToast } = useToast();

  const { profile } = useAuthContext();

  const [isNftListDialogOpen, setIsNftListDialogOpen] = useState(false);
  const [isCropImageDialogOpen, setIsCropImageDialogOpen] = useState(false);

  const hasWallet = !!profile?.walletAddress;

  const handleSelectNft = ({ tokenId, assetContract, image }: Nft): void => {
    setMediaImage({
      type: MediaType.nft,
      url: image,
      media: {
        tokenId: String(tokenId),
        contractAddress: assetContract.address,
      },
    });

    setIsNftListDialogOpen(false);
    setIsCropImageDialogOpen(true);
  };

  const handleSelectUploadImage = (imageList: ImageListType): void => {
    setMediaImage(
      imageList[0].dataURL && imageList[0].file
        ? { type: MediaType.file, url: imageList[0].dataURL, media: imageList[0].file }
        : undefined,
    );
    setIsCropImageDialogOpen(true);
  };

  const handleReset = (): void => {
    setMediaImage(null);
  };

  const handleErrors = (errors: ErrorsType): void => {
    if (errors?.maxFileSize) {
      showToast(t("error.uploadImageMaxFileSize"));
    }
    if (errors?.acceptType) {
      showToast(t("error.uploadImageAcceptType"));
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={4}>
          <Box width="100%">
            <ImageUploading
              value={[]}
              onChange={handleSelectUploadImage}
              onError={handleErrors}
              maxNumber={1}
              maxFileSize={2000000}
              acceptType={["jpg", "jpeg", "png"]}>
              {({ onImageUpload }) => (
                <Button fullWidth variant="outlined" onClick={onImageUpload}>
                  {t("cta.upload")}
                </Button>
              )}
            </ImageUploading>
          </Box>
          <Box width="100%">
            <Button
              fullWidth
              variant="outlined"
              onClick={
                hasWallet ? () => setIsNftListDialogOpen(true) : () => showNoWalletToast(NoWalletToastContentType.event)
              }>
              {t("cta.selectNft")}
            </Button>
          </Box>
        </Stack>

        <Button fullWidth onClick={handleReset}>
          {t("cta.reset")}
        </Button>
      </Stack>

      {isNftListDialogOpen && !!profile?.walletAddress && (
        <NftListDialog
          walletAddress={profile.walletAddress}
          closeNftListDialog={() => setIsNftListDialogOpen(false)}
          setSelectedNftInput={handleSelectNft}
        />
      )}

      {isCropImageDialogOpen && mediaImage && (
        <CropImageDialog
          mediaImage={mediaImage}
          ratio={ratio}
          setMediaImage={setMediaImage}
          handleClose={() => setIsCropImageDialogOpen(false)}
        />
      )}
    </>
  );
};

export default ImageSelectButtons;
