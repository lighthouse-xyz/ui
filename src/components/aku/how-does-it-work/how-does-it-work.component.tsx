import React from "react";
import { useTranslation } from "react-i18next";

import SignUpForm from "../sign-up-form/sign-up-form.component";
import { BlackRoundedBox, SectionContainer, StyledStepper } from "./how-does-it-work.style";
import {
  Box,
  Container,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import akuPeaceImage from "@src/assets/images/aku-peace-image.webp";
import SignInButton from "@src/components/aku/sign-in-button/sign-in-button.component";

interface StepItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

const HowDoesItWork: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("aku");

  const isSmallView = useMediaQuery(theme.breakpoints.down("sm"));

  const steps: StepItem[] = [
    {
      title: t("howDoesItWork.signIn.label"),
      description: t("howDoesItWork.signIn.description"),
      content: <SignInButton displayInfo="alert" />,
    },
    {
      title: t("howDoesItWork.signUp.label"),
      description: t("howDoesItWork.signUp.description"),
      content: <SignUpForm />,
    },
    {
      title: t("howDoesItWork.completeHunts.label"),
      description: t("howDoesItWork.completeHunts.description"),
    },
  ];

  return (
    <SectionContainer
      bgcolor="background.default"
      color="text.primary"
      paddingTop={{ xs: 35, md: 50 }}
      paddingBottom={{ xs: 11, md: 25 }}>
      <BlackRoundedBox placement="top" />

      <Container maxWidth="mdLg">
        <Stack
          position="relative"
          justifyContent={{ xs: "center", md: "space-between" }}
          direction={{ xs: "column", md: "row" }}
          paddingBottom={{ md: 25 }}
          spacing={{ xs: 11, md: 0 }}>
          <Typography
            fontSize={{ xs: "36px", sm: "40px" }}
            lineHeight={{ xs: "46px", sm: "51px" }}
            textAlign={{ xs: "center", md: "left" }}
            marginRight={{ md: 35 }}>
            {t("howDoesItWork.label")}
          </Typography>

          <StyledStepper orientation="vertical" smallview={isSmallView.toString()}>
            {steps.map(step => (
              <Step key={`aku-step-${step.title}`} active>
                <StepLabel>
                  <Typography variant="h6">{step.title}</Typography>
                </StepLabel>
                <StepContent>
                  <Stack spacing={6}>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                    {step.content}
                  </Stack>
                </StepContent>
              </Step>
            ))}
          </StyledStepper>
          <Box
            component="img"
            src={akuPeaceImage}
            position={{ md: "absolute" }}
            bottom="-60px"
            left="-60px"
            maxHeight={{ xs: "300px", md: "460px" }}
            maxWidth={{ xs: "300px", md: "460px" }}
          />
        </Stack>
      </Container>

      <BlackRoundedBox placement="bottom" />
    </SectionContainer>
  );
};

export default HowDoesItWork;
