import React from "react";
import { useTranslation } from "react-i18next";

import { Button, ButtonProps } from "@mui/material";
import { OpenChromeStoreOrigin, TrackEvent } from "@src/common/enums/track-events.enum";
import links from "@src/common/links";
import useMixpanelTrack from "@src/hooks/utils/use-mixpanel-track.hook";

interface Props extends ButtonProps {
  origin: OpenChromeStoreOrigin;
}

const DownloadExtensionButton: React.FC<Props> = ({ origin, ...props }) => {
  const { t } = useTranslation();
  const trackInMixpanel = useMixpanelTrack();

  const handleOpenChromeStoreClick = (): void => {
    trackInMixpanel(TrackEvent.openChromeStore, { origin });
    window.open(links.externalPages.downloadExtension);
  };

  return (
    <Button onClick={handleOpenChromeStoreClick} {...props}>
      {t("cta.openChromeStore")}
    </Button>
  );
};

export default DownloadExtensionButton;
