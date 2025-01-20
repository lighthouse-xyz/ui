import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { BannerPaper, ConnectionsPanelImage } from "./extension-banner.style";
import { Box, Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close-icon.svg";
import connectionsPanelImage from "@src/assets/images/connections-panel-image.svg";
import { OpenChromeStoreOrigin } from "@src/common/enums/track-events.enum";
import DownloadExtensionButton from "@src/components/common/download-extension-button/download-extension-button.component";
import { useVrContext } from "@src/context/vr/vr-context";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";

const ExtensionBanner: React.FC = () => {
  const { t } = useTranslation();

  const { vrMode } = useVrContext();
  const bpTwoCards = vrMode ? "twoCardsVr" : "twoCards";
  const bpThreeCards = vrMode ? "threeCardsVr" : "threeCards";

  const [isBannerDismissed, setIsBannerDismissed] = useState(() =>
    getLocalStorage<boolean>(localStorageKeys.extensionBannerDismissed, false),
  );

  useEffect(
    () => setLocalStorage<boolean>(localStorageKeys.extensionBannerDismissed, isBannerDismissed),
    [isBannerDismissed],
  );

  return (
    <Collapse in={!isBannerDismissed} className={vrMode ? "hidden" : undefined}>
      <BannerPaper elevation={0}>
        <ConnectionsPanelImage src={connectionsPanelImage} />
        <Stack
          direction="row"
          height="100%"
          spacing={10}
          flexWrap="nowrap"
          alignItems="stretch"
          justifyContent={{ xs: "space-between", [bpThreeCards]: "flex-end" }}>
          <Stack
            position="relative"
            flexGrow={1}
            color="common.white"
            spacing={5}
            maxWidth={{ xs: "320px", [bpTwoCards]: "350px", [bpThreeCards]: "509px" }}
            alignItems={{ xs: "flex-start", [bpThreeCards]: "flex-end" }}
            textAlign={{ xs: "start", [bpThreeCards]: "end" }}>
            <Box>
              <Typography sx={{ typography: { xs: "h5", [bpThreeCards]: "h4" } }}>
                {t("browserExtension.banner.title")}
              </Typography>
            </Box>
            <DownloadExtensionButton
              disabled={true}
              variant="contained"
              size="large"
              origin={OpenChromeStoreOrigin.banner}
            />
          </Stack>

          <Box alignSelf="flex-start">
            <IconButton onClick={() => setIsBannerDismissed(true)} color="secondary" aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      </BannerPaper>
    </Collapse>
  );
};

export default ExtensionBanner;
