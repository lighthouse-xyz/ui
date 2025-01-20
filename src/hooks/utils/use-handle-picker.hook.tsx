import React from "react";
import { UseFormReturn } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";

import useUpdateProfile from "../user/use-update-profile.hook";
import { TextFieldProps } from "./use-create-form/use-create-form.interface";
import useToast from "./use-toast.hook";
import InputAdornment from "@mui/material/InputAdornment";
import { UpdateProfileInput } from "@src/common/graphql/generated/user.schema.graphql";
import { useSwiper } from "swiper/react";

interface HandlePickerUtils {
  getUniqueHandleTextField: (withTitle?: boolean) => JSX.Element;
  handleSubmit: (input: UpdateProfileInput) => void;
  loading: boolean;
}

function useHandlePicker(
  createTextField: (props: TextFieldProps) => JSX.Element,
  formContext: UseFormReturn<UpdateProfileInput>,
  userId?: string,
  initialHandle?: string,
  skipOnError?: boolean,
): HandlePickerUtils {
  const maxHandleLength = 15;

  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });

  const { updateProfile, loading } = useUpdateProfile();
  const swiper = useSwiper();

  const handleSubmit = (formValues: Pick<UpdateProfileInput, "handle">): void => {
    void updateProfile({
      variables: { input: { handle: formValues.handle }, id: userId },
      onCompleted: () => swiper.slideNext(),
      onError: errorUpdateProfile => {
        const handleAlreadyTakenError = errorUpdateProfile.graphQLErrors?.find(
          ({ extensions }) => extensions.code === "USER_HANDLE_ALREADY_TAKEN",
        );
        if (handleAlreadyTakenError) {
          formContext.setError("handle", { type: "validate" });
        } else {
          showToast(t("error.updateProfileLater"));
          if (skipOnError) swiper.slideNext();
        }
      },
    });
  };

  const getUniqueHandleTextField = (withTitle?: boolean): JSX.Element =>
    createTextField({
      varName: "handle",
      label: withTitle ? t("handle.claim.label") : undefined,
      placeholder: t("form.placeholder.handle"),
      initialCount: initialHandle?.length ?? 0,
      maxLength: maxHandleLength,
      InputProps: {
        startAdornment: <InputAdornment position="start">@</InputAdornment>,
      },
      validation: { pattern: /^[0-9a-zA-Z]+$/, required: true },
      parseError: error =>
        error.type === "pattern"
          ? t("error.invalidHandle")
          : error.type === "required"
          ? t("error.required")
          : t("error.handleAlreadyTaken"),
      sx: {
        ".MuiFormHelperText-root": {
          textAlign: "right",
        },
      },
    });

  return { getUniqueHandleTextField, handleSubmit, loading };
}

export { useHandlePicker };
