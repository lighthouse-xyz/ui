import React from "react";
import { Trans, useTranslation } from "react-i18next";

import StepLayout from "../step-layout/step-layout.component";
import { Link, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import onboardingWelcomeImage from "@src/assets/images/onboarding-welcome-image.jpg";
import links from "@src/common/links";

interface Props {
  index: number;
  nbSteps: number;
}

const WelcomeStep: React.FC<Props> = ({ index, nbSteps }) => {
  const { t } = useTranslation();

  const content = (
    <Stack spacing={5} paddingX={10}>
      <Typography variant="body1" color="text.secondary">
        {t("signInOnboarding.welcome.description.paragraph1")}
      </Typography>
      <Typography variant="body1" color="text.secondary" component="div">
        <Trans
          i18nKey="signInOnboarding.welcome.description.paragraph2"
          components={{ Link: <Link underline="none" target="_blank" href={links.externalPages.avatarsReward} /> }}
        />
      </Typography>
    </Stack>
  );

  return (
    <StepLayout
      index={index}
      nbSteps={nbSteps}
      image={onboardingWelcomeImage}
      title={t("signInOnboarding.welcome.title")}
      content={content}
    />
  );
};

export default WelcomeStep;
