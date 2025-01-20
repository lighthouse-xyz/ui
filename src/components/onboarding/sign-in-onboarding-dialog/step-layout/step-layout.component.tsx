import React from "react";
import { FieldValues, FormContainer, SubmitHandler, UseFormReturn } from "react-hook-form-mui";

import { LoadingButton } from "@mui/lab";
import { Button, Card, CardMedia, LinearProgress, Stack, Typography } from "@mui/material";
import { borderRadius } from "@src/common/styles/style.const";
import LoadingBackdrop from "@src/components/common/loading-backdrop/loading-backdrop.component";
import { t } from "i18next";
import { useSwiper } from "swiper/react";

interface Props<T extends FieldValues> {
  index: number;
  nbSteps: number;
  image: string;
  title: string;
  subtitle?: string;
  content: JSX.Element;
  form?: {
    context: UseFormReturn<T>;
    loading: boolean;
    onSubmit: SubmitHandler<T>;
  };
  nextButtonLabel?: string;
  closeDialog?: () => void;
}

const StepLayout = <T extends FieldValues>({
  index,
  nbSteps,
  image,
  title,
  subtitle,
  content,
  form,
  nextButtonLabel,
  closeDialog,
}: Props<T>): JSX.Element => {
  const oneHundred = 100;

  const swiper = useSwiper();

  const getProgress = (): number => {
    const value = ((index + 1) / nbSteps) * oneHundred;
    return Math.min(value, oneHundred);
  };

  const isLastStep = getProgress() === oneHundred;
  const isFirstStep = index === 0;

  const handleNext = (): void => {
    if (!form) {
      closeDialog ? closeDialog() : swiper.slideNext();
    }
  };

  return (
    <Card key={`onboarding-slide-${index}-${title}`} elevation={0}>
      <CardMedia sx={{ height: 276 }} image={image} title={title} />

      <LinearProgress variant="determinate" value={getProgress()} />

      <FormContainer formContext={form?.context} onSuccess={form?.onSubmit}>
        <LoadingBackdrop open={!!form?.loading} borderRadius={borderRadius.default} />

        <Stack spacing={4} whiteSpace="pre-line" paddingX={10} paddingY={6} textAlign="center" height="content-fit">
          <Stack spacing={2}>
            <Typography variant="h5">{title}</Typography>
            {!!subtitle && <Typography variant="body1">{subtitle}</Typography>}
          </Stack>

          {content}

          <Stack direction="row" spacing={4}>
            {!isFirstStep && !isLastStep && (
              <Button
                fullWidth
                disabled={form?.loading}
                variant="outlined"
                size="large"
                onClick={() => swiper.slidePrev()}>
                {t("cta.back")}
              </Button>
            )}
            <LoadingButton
              type="submit"
              fullWidth
              variant={isLastStep ? "outlined" : "contained"}
              size="large"
              loading={form?.loading}
              onClick={handleNext}>
              {nextButtonLabel || (isLastStep ? t("cta.gotIt") : t("cta.next"))}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormContainer>
    </Card>
  );
};

export default StepLayout;
