import React from "react";

import { CustomWidthTooltip } from "./onboarding-checklist-item.style";
import { Divider, Stack, StepIconProps, Typography, useTheme } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ReactComponent as CircleIcon } from "@src/assets/icons/circle-icon.svg";
import { ReactComponent as HelpIcon } from "@src/assets/icons/help-circle-icon.svg";
import { TickCircle } from "iconsax-react";

interface Props {
  label: string;
  tooltip?: string;
  completed?: boolean;
  button?: JSX.Element;
  index?: number;
  totalSteps?: number;
  maxCharsPerLine?: number;
}
const OnboardingChecklistItem: React.FC<Props> = ({
  index = 0,
  label,
  tooltip,
  completed,
  totalSteps = 1,
  button,
  maxCharsPerLine,
}) => {
  const { palette } = useTheme();

  const stepIcon = (
    { completed: stepCompleted }: StepIconProps,
    stepIndex: number,
    dividerHeight: string,
  ): JSX.Element => (
    <Stack>
      {stepCompleted ? (
        <TickCircle variant="Bold" color={palette.success.main} />
      ) : (
        <CircleIcon color={palette.text.secondary} />
      )}
      {stepIndex !== totalSteps - 1 && (
        <Divider orientation="vertical" sx={{ height: dividerHeight, marginRight: "11.5px", marginTop: "4px" }} />
      )}
    </Stack>
  );

  return (
    <Step active completed={completed}>
      <StepLabel
        StepIconComponent={(props: StepIconProps) =>
          stepIcon(props, index, !!maxCharsPerLine && label.length > maxCharsPerLine ? "32px" : "20px")
        }
        sx={{ alignItems: "flex-start" }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="body1"
              sx={{
                ...(completed ? { textDecorationLine: "line-through" } : {}),
              }}>
              {label}
            </Typography>
            {!!tooltip && (
              <CustomWidthTooltip title={tooltip} arrow placement="right">
                <HelpIcon color={palette.action.active} />
              </CustomWidthTooltip>
            )}
          </Stack>
          {!!button && !completed && button}
        </Stack>
      </StepLabel>
    </Step>
  );
};

export default OnboardingChecklistItem;
