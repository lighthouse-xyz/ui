import React from "react";
import { RadioButtonGroup, useForm } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";

import StepLayout from "../step-layout/step-layout.component";
import onboardingPickCategoryImage from "@src/assets/images/onboarding-pick-category-image.jpg";
import { UpdateProfileInput, UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import useUpdateProfile from "@src/hooks/user/use-update-profile.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import { useSwiper } from "swiper/react";

interface Props {
  userId: string;
  initialCategory: UserCategory;
  index: number;
  nbSteps: number;
}

const PickCategoryStep: React.FC<Props> = ({ userId, initialCategory, index, nbSteps }) => {
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });

  const swiper = useSwiper();

  const { updateProfile, loading } = useUpdateProfile();
  const formContext = useForm<UpdateProfileInput>({ defaultValues: { category: initialCategory } });

  const handleSubmit = (input: UpdateProfileInput): void => {
    void updateProfile({
      variables: { input, id: userId },
      onCompleted: () => swiper.slideNext(),
      onError: () => {
        showToast(t("error.updateProfileLater"));
        swiper.slideNext();
      },
    });
  };

  const content = (
    <RadioButtonGroup
      name="category"
      options={[
        { id: UserCategory.explorer, label: t("enum.userCategory.explorer") },
        { id: UserCategory.creator, label: t("enum.userCategory.creator") },
      ]}
      required
      aria-labelledby="radio-buttons-group-category-picker"
    />
  );

  return (
    <StepLayout
      index={index}
      nbSteps={nbSteps}
      image={onboardingPickCategoryImage}
      title={t("signInOnboarding.pickCategory.title")}
      content={content}
      form={{ context: formContext, loading, onSubmit: handleSubmit }}
    />
  );
};

export default PickCategoryStep;
