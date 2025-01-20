import React from "react";
import { useTranslation } from "react-i18next";

import StepLayout from "../step-layout/step-layout.component";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import onboardingDownloadExtensionImage from "@src/assets/images/onboarding-download-extension-image.jpg";
import { OpenChromeStoreOrigin } from "@src/common/enums/track-events.enum";
import DownloadExtensionButton from "@src/components/common/download-extension-button/download-extension-button.component";

interface Props {
  index: number;
  nbSteps: number;
  closeDialog: () => void;
}

const DownloadExtensionStep: React.FC<Props> = ({ index, nbSteps, closeDialog }) => {
  const { t } = useTranslation();

  const content = (
    <Stack spacing={4}>
      <Typography variant="body2">{t("signInOnboarding.downloadExtension.description")}</Typography>
      <DownloadExtensionButton fullWidth variant="contained" size="large" origin={OpenChromeStoreOrigin.onboarding} />
    </Stack>
  );

  return (
    <StepLayout
      index={index}
      nbSteps={nbSteps}
      image={onboardingDownloadExtensionImage}
      title={t("signInOnboarding.downloadExtension.title")}
      content={content}
      closeDialog={closeDialog}
    />
  );
};

export default DownloadExtensionStep;
