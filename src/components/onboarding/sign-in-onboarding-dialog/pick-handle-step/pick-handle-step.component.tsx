import React from "react";
import { useTranslation } from "react-i18next";

import StepLayout from "../step-layout/step-layout.component";
import onboardingPickHandleImage from "@src/assets/images/onboarding-pick-handle-image.jpg";
import { UpdateProfileInput } from "@src/common/graphql/generated/user.schema.graphql";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import { useHandlePicker } from "@src/hooks/utils/use-handle-picker.hook";

interface Props {
  index: number;
  nbSteps: number;
  userId: string;
  initialHandle?: string;
}

const PickHandleStep: React.FC<Props> = ({ index, nbSteps, userId, initialHandle }) => {
  const { t } = useTranslation();

  const {
    formContext,
    inputCreators: { createTextField },
  } = useCreateForm<UpdateProfileInput>({ handle: initialHandle });

  const { getUniqueHandleTextField, loading, handleSubmit } = useHandlePicker(
    createTextField,
    formContext,
    userId,
    initialHandle,
    true,
  );

  return (
    <StepLayout
      index={index}
      nbSteps={nbSteps}
      image={onboardingPickHandleImage}
      title={t("signInOnboarding.pickHandle.title")}
      subtitle={t("signInOnboarding.pickHandle.subtitle")}
      content={getUniqueHandleTextField()}
      form={{
        context: formContext,
        loading,
        onSubmit: handleSubmit,
      }}
      nextButtonLabel={t("cta.claim")}
    />
  );
};

export default PickHandleStep;
