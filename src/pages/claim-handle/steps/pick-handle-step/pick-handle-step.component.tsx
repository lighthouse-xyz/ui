import React, { useEffect } from "react";
import { FormContainer } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";

import ClaimHandleHeader from "../../claim-handle-header/claim-handle-header.component";
import ProfileInfos from "../../profile-infos/profile-infos.component";
import SignOutButton from "../../sign-out-button/sign-out-button.component";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { UpdateProfileInput } from "@src/common/graphql/generated/user.schema.graphql";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import { useHandlePicker } from "@src/hooks/utils/use-handle-picker.hook";

const PickHandleStep: React.FC = () => {
  const { t } = useTranslation();

  const { profile } = useAuthContext();

  const {
    formContext,
    errors,
    inputCreators: { createTextField },
    resetForm,
  } = useCreateForm<UpdateProfileInput>({ handle: profile?.handle });

  const { getUniqueHandleTextField, loading, handleSubmit } = useHandlePicker(
    createTextField,
    formContext,
    profile?.userId,
    profile?.handle,
  );

  useEffect(() => {
    if (profile) {
      resetForm({ handle: profile.handle });
    }
  }, [profile]);

  return (
    <Stack spacing={10} alignItems="center">
      <ClaimHandleHeader title={t("handle.claim.label")} subtitle={t("handle.claim.lock")} />

      <>
        <ProfileInfos />
        <Box alignSelf="stretch">
          <FormContainer formContext={formContext} onSuccess={handleSubmit}>
            <Stack spacing={10}>
              <>{getUniqueHandleTextField(true)}</>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={Object.keys(errors).length !== 0}
                loading={loading}>
                {t("cta.claim")}
              </LoadingButton>
            </Stack>
          </FormContainer>
        </Box>
        <SignOutButton />
      </>
    </Stack>
  );
};

export default PickHandleStep;
