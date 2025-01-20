import React, { useEffect } from "react";
import { CheckboxElement, FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";

import { FormContent } from "./sign-up-form.style";
import { LoadingButton } from "@mui/lab";
import { Typography, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { usePrivy } from "@privy-io/react-auth";
import { RegisterToAkuInput } from "@src/common/graphql/generated/user.schema.graphql";
import useRegisterToAku from "@src/hooks/user/use-register-to-aku.hook";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  forceDarkMode?: boolean;
  displayInputLabel?: boolean;
}

const SignUpForm: React.FC<Props> = ({ forceDarkMode = false, displayInputLabel = false }) => {
  const { t } = useTranslation("aku");
  const theme = useTheme();
  const { user } = usePrivy();
  const { showToast } = useToast({ variant: "success" });

  const { registerToAku, loading } = useRegisterToAku();

  const defaultEmail = user?.email?.address || user?.google?.email || user?.discord?.email || undefined;
  const { formContext, resetForm } = useCreateForm<RegisterToAkuInput>({
    email: defaultEmail,
    subscribeToNewsletter: false,
  });

  useEffect(() => {
    if (defaultEmail) {
      resetForm({ email: defaultEmail });
    }
  }, [user]);

  const handleSubmit = (formValues: RegisterToAkuInput): void => {
    const input = {
      email: formValues.email.trim(),
      subscribeToNewsletter: formValues.subscribeToNewsletter,
    };

    void registerToAku({
      variables: { input },
      onCompleted: () => {
        showToast(
          { title: t("success.signUp.title"), message: t("success.signUp.subtitle") },
          { action: { closeButton: true } },
        );
      },
      onError: error => {
        const invalidEmail = error.graphQLErrors?.find(({ message }) => message === "input.email must be an email");

        if (invalidEmail) {
          formContext.setError("email", { message: t("error.invalidEmail") });
        } else {
          showToast(t("error.generic"), { variant: "error" });
        }
      },
    });
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmit}>
      <FormContent colormode={forceDarkMode ? "dark" : theme.palette.mode}>
        {displayInputLabel && (
          <Typography variant="body1" marginBottom={2}>
            {t("howDoesItWork.signUp.label")}
          </Typography>
        )}
        <Stack direction="row" spacing={2} alignItems="baseline" marginBottom={3}>
          <>
            <TextFieldElement required variant="outlined" name="email" placeholder="Email" />
            <LoadingButton loading={loading} type="submit" size="large" variant="outlined">
              {t("cta.submit")}
            </LoadingButton>
          </>
        </Stack>
        <CheckboxElement
          name="subscribeToNewsletter"
          label={t("howDoesItWork.signUp.signUpToNewsletter")}
          color="default"
          sx={{ marginLeft: 4 }}
        />
      </FormContent>
    </FormContainer>
  );
};

export default SignUpForm;
