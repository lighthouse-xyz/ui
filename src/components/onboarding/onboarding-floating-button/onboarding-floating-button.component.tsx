import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import OnboardingChecklistItem from "../onboarding-checklist-item/onboarding-checklist-item.component";
import OnboardingFloatingButtonBadge from "../onboarding-floating-button-badge/onboarding-floating-button-badge.component";
import { FixedButton, StyledStepper } from "./onboarding-floating-button.style";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, LinearProgress, Menu, Stack, Typography } from "@mui/material";
import { ReactComponent as OpenLinkIcon } from "@src/assets/icons/open-link-icon.svg";
import { ReactComponent as TickIcon } from "@src/assets/icons/tick-circle-bold-icon.svg";
import { OpenChromeStoreOrigin } from "@src/common/enums/track-events.enum";
import { UserOnboardingState } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import DownloadExtensionButton from "@src/components/common/download-extension-button/download-extension-button.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import { useLazyGetUserOnboardingState } from "@src/hooks/user/use-get-user-onboarding-state.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useFeatureFlag, { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";

const stepGateModifAt = "stepGateModifAt";
const stepPinAt = "stepPinAt";
const stepExtensionInstallAt = "stepExtensionInstallAt";
type FinishAtState = Pick<
  UserOnboardingState,
  typeof stepGateModifAt | typeof stepPinAt | typeof stepExtensionInstallAt
>;
type StepFinishAtKeys = keyof FinishAtState;
const stepFinishAtKeys = [stepGateModifAt, stepPinAt, stepExtensionInstallAt] as const;

interface OnboardingStep {
  label: string;
  finishAtKey?: StepFinishAtKeys;
  tooltip?: string;
}

interface Props {
  userId: string;
  handle?: string;
}

const OnboardingFloatingButton: React.FC<Props> = ({ userId, handle }) => {
  const maxPercentage = 100;
  const nbSteps = 4;
  const maxCharsPerLine = 40;

  const { t } = useTranslation();
  const { isFeatureEnabled } = useFeatureFlag();
  const { navigateToDialog } = useDialog();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOnboardingOpen = Boolean(anchorEl);

  const { getOnboardingState, loading, data } = useLazyGetUserOnboardingState();
  const onboardingState = data?.userOnboardingState;
  const completedSteps = onboardingState
    ? Object.entries(onboardingState).filter(
        ([key, finishAt]) => !!finishAt && stepFinishAtKeys.includes(key as StepFinishAtKeys),
      )
    : [];
  const nbStepsCompleted = 1 + completedSteps.length;
  const isCompleted = nbStepsCompleted === nbSteps;

  const steps: OnboardingStep[] = [
    { label: t("onboarding.checklist.step1.label") },
    {
      label: t("onboarding.checklist.step2.label"),
      tooltip: t("onboarding.checklist.step2.tooltip"),
      finishAtKey: stepGateModifAt,
    },
    { label: t("onboarding.checklist.step3.label"), finishAtKey: stepPinAt },
    {
      label: t("onboarding.checklist.step4.label"),
      finishAtKey: stepExtensionInstallAt,
    },
  ];

  useEffect(() => {
    void getOnboardingState({ variables: { userId } });
  }, []);

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    void getOnboardingState({ variables: { userId } });
  };

  const handleClaimAvatar = (): void => {
    handleClose();
    navigateToDialog(paths.claimAvatars, { userId, handle });
  };

  const getProgress = (): number => {
    const value = (nbStepsCompleted / nbSteps) * maxPercentage;
    return Math.min(value, maxPercentage);
  };

  const isStepCompleted = (finishAtKey?: StepFinishAtKeys): boolean =>
    !finishAtKey || (!!onboardingState && !!onboardingState[finishAtKey]);

  const downloadExtensionButton = (
    <DownloadExtensionButton
      origin={OpenChromeStoreOrigin.onboardingChecklist}
      size="small"
      endIcon={<OpenLinkIcon color="text.secondary" width="24px" height="24px" />}
      sx={{ maxWidth: "fit-content", padding: 1 }}
    />
  );

  const onboardingButtonContent = (
    <>
      <TickIcon />
      {t("onboarding.label")}
    </>
  );

  return (
    <Stack>
      <FixedButton
        color="primary"
        variant="extended"
        size="large"
        onClick={handleOpen}
        className="onboarding-btn"
        aria-label="onboarding-state">
        {isFeatureEnabled(FeatureFlag.onboardingButtonBadge) && !!onboardingState ? (
          <OnboardingFloatingButtonBadge userId={userId} initialStepsUncompleted={nbSteps - nbStepsCompleted}>
            {onboardingButtonContent}
          </OnboardingFloatingButtonBadge>
        ) : (
          onboardingButtonContent
        )}
      </FixedButton>

      <Menu
        open={isOnboardingOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ "& .MuiMenu-paper": { width: "412px", maxHeight: "100%" } }}>
        {loading ? (
          <Box display="flex" height="100%" justifyContent="center" alignItems="center">
            <LoadingIndicator size="80px" />
          </Box>
        ) : (
          <Stack padding={2} spacing={4}>
            <Typography variant="h6">
              {t("onboarding.checklist.title", { context: isCompleted ? "completed" : undefined })}
            </Typography>

            <Stack spacing={4}>
              <LinearProgress variant="determinate" value={getProgress()} />
              <Typography variant="subtitle2">
                {t("onboarding.checklist.progress", {
                  value: getProgress(),
                  context: isCompleted ? "completed" : undefined,
                })}
              </Typography>
              <Divider />
              <StyledStepper orientation="vertical">
                {steps.map((step, index) => (
                  <OnboardingChecklistItem
                    key={`onboarding-checklist-step-${step.label}`}
                    index={index}
                    label={step.label}
                    tooltip={step.tooltip}
                    completed={isStepCompleted(step.finishAtKey)}
                    button={step.finishAtKey === stepExtensionInstallAt ? downloadExtensionButton : undefined}
                    totalSteps={nbSteps}
                    maxCharsPerLine={maxCharsPerLine}
                  />
                ))}
              </StyledStepper>
            </Stack>

            <Box alignSelf="center" padding={4} paddingBottom={0}>
              <LoadingButton variant="contained" size="large" disabled={!isCompleted} onClick={handleClaimAvatar}>
                {t("cta.claimAvatar")}
              </LoadingButton>
            </Box>
          </Stack>
        )}
      </Menu>
    </Stack>
  );
};

export default OnboardingFloatingButton;
