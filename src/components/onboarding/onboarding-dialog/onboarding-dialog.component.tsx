import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { heightImageSection, StyledImg, Video } from "./onboarding-dialog.style";
import { Box, Button, Card, LinearProgress, Stack, Typography } from "@mui/material";
import { landingPageVideo } from "@src/assets/hosted-assets";
import extensionImage from "@src/assets/images/onboarding-extension-image.svg";
import followImage from "@src/assets/images/onboarding-follow-image.svg";
import jumpImage from "@src/assets/images/onboarding-jump-image.svg";
import { OpenChromeStoreOrigin } from "@src/common/enums/track-events.enum";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import DownloadExtensionButton from "@src/components/common/download-extension-button/download-extension-button.component";
import { localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";
import editGateImage from "src/assets/images/onboarding-edit-gate-image.svg";

interface StepProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

interface Props {
  onClose: () => void;
  onlyExtension?: boolean;
}

const OnboardingDialog: React.FC<Props> = ({ onClose: handleClose, onlyExtension = false }) => {
  const oneHundred = 100;

  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const extensionSlide = {
    title: t("onboarding.extension.title"),
    description: t("onboarding.extension.description"),
    image: extensionImage,
  };

  const steps: StepProps[] = onlyExtension
    ? [extensionSlide]
    : [
        {
          title: t("onboarding.welcome.title"),
          subtitle: t("onboarding.welcome.subtitle"),
        },
        {
          title: t("onboarding.jump.title"),
          description: t("onboarding.jump.description"),
          image: jumpImage,
        },
        {
          title: t("onboarding.follow.title"),
          description: t("onboarding.follow.description"),
          image: followImage,
        },
        {
          title: t("onboarding.editGate.title"),
          description: t("onboarding.editGate.description"),
          image: editGateImage,
        },
        extensionSlide,
      ];

  const nbSteps = steps.length;
  const isLastStep = activeStep === nbSteps - 1;

  const handleNext = (): void => {
    if (isLastStep) {
      handleClose();
      setLocalStorage<boolean>(localStorageKeys.onboarding, false);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  useEffect(() => {
    const value = ((activeStep + 1) / nbSteps) * oneHundred;
    setProgress(Math.min(value, oneHundred));
  }, [activeStep]);

  return (
    <DialogFrame persistent width="md" onClose={handleClose} data-testid={"onboarding-dialog"}>
      <Card elevation={0}>
        <Box position="relative" height={heightImageSection}>
          <Video src={landingPageVideo} autoPlay loop muted />

          {!!steps[activeStep].image && (
            <StyledImg src={steps[activeStep].image} height={heightImageSection} width="100%" />
          )}
        </Box>

        <LinearProgress variant="determinate" value={progress} />

        <Stack direction="row" alignSelf="stretch" whiteSpace="pre-line">
          <Stack spacing={5} padding={6}>
            <Typography variant="h4" width={steps[activeStep].description ? "240px" : undefined}>
              {steps[activeStep].title}
            </Typography>
            {!!steps[activeStep].subtitle && <Typography variant="h6">{steps[activeStep].subtitle}</Typography>}
          </Stack>
          <Stack spacing={6} padding={6} alignSelf="flex-end" flexGrow={1}>
            {!!steps[activeStep].description && (
              <Typography variant="body2" height="60px">
                {steps[activeStep].description}
              </Typography>
            )}

            <Stack alignSelf="flex-end" direction="row" spacing={4}>
              {isLastStep && (
                <DownloadExtensionButton
                  variant="outlined"
                  size="large"
                  origin={onlyExtension ? OpenChromeStoreOrigin.afterThirdJump : OpenChromeStoreOrigin.onboarding}
                />
              )}
              <Button variant="contained" size="large" onClick={handleNext}>
                {isLastStep ? t("cta.gotIt") : t("cta.next")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </DialogFrame>
  );
};

export default OnboardingDialog;
