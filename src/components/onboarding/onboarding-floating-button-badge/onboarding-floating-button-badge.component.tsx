import React, { PropsWithChildren, useEffect, useState } from "react";

import { StyledBadge } from "./onboarding-floating-button-badge.style";
import { useOnboardingStateUpdated } from "@src/hooks/user/use-onboarding-state-updated.hook";

interface Props {
  userId: string;
  initialStepsUncompleted: number;
}

const OnboardingFloatingButtonBadge: React.FC<PropsWithChildren<Props>> = ({
  userId,
  initialStepsUncompleted,
  children,
}) => {
  const [stepsUncompleted, setStepsUncompleted] = useState(initialStepsUncompleted);

  const { data } = useOnboardingStateUpdated({ userId });

  useEffect(() => {
    if (data) {
      setStepsUncompleted(data.onboardingStateUpdated.stepsUncompleted);
    }
  }, [data]);

  return (
    <StyledBadge badgeContent={stepsUncompleted || "✓"} color={stepsUncompleted ? "error" : "success"}>
      {children}
    </StyledBadge>
  );
};

export default OnboardingFloatingButtonBadge;
