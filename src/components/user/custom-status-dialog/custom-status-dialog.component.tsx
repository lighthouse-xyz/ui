import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormContainer, SelectElement, TextFieldElement } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";

import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Status, UpdateCustomStatusInput } from "@src/common/graphql/generated/user.schema.graphql";
import { borderRadius } from "@src/common/styles/style.const";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "@src/components/common/form-confirmation-buttons/form-confirmation-buttons.component";
import LoadingBackdrop from "@src/components/common/loading-backdrop/loading-backdrop.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useStatus from "@src/hooks/user/use-status.hook";
import useUpdateCustomStatus from "@src/hooks/user/use-update-custom-status.hook";
import useDate from "@src/hooks/utils/use-date.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import { ArrowDown2 } from "iconsax-react";

enum ClearAfter {
  today,
  fourHours,
  oneHour,
  thirtyMinutes,
  never,
  custom,
}

interface StatusFormValues {
  customStatus: string | null;
  clearAfter: ClearAfter;
}

const CustomStatusDialog: React.FC = () => {
  const dialogName = "custom-status-dialog";
  const hideToastAfter = 5000;

  const { closeDialog } = useDialog();
  const { showToast } = useToast({ variant: "error", hideAfter: hideToastAfter });
  const { t } = useTranslation();
  const { formatDates } = useDate();

  const { profile, loading: loadingProfile } = useAuthContext();

  const { getStatus: getCurrentStatus, loading: loadingCurrentStatus } = useStatus();
  const { updateCustomStatus, loading } = useUpdateCustomStatus();

  const [currentStatus, setCurrentStatus] = useState<Status>({} as Status);
  const [hasStatus, setHasStatus] = useState(!!profile?.customStatus);
  const [clearAfterOptions, setClearAfterOptions] = useState([
    { id: ClearAfter.today, label: t("time.today") },
    { id: ClearAfter.fourHours, label: t("time.hour", { count: 4 }) },
    { id: ClearAfter.oneHour, label: t("time.hour", { count: 1 }) },
    { id: ClearAfter.thirtyMinutes, label: t("time.minute", { count: 30 }) },
    { id: ClearAfter.never, label: t("time.dontClear") },
  ]);

  const formContext = useForm<StatusFormValues>();
  const { reset: resetForm } = formContext;

  useEffect(() => {
    if (!loadingProfile && profile) {
      const customStatusExist = !!profile.customStatus;

      setHasStatus(customStatusExist);

      if (customStatusExist) {
        void getCurrentStatus({
          variables: { userId: profile.userId },
          onCompleted: data => {
            setCurrentStatus(data.status);

            if (data.status.customStatusExpiresAt) {
              const newOption = {
                id: ClearAfter.custom,
                label: formatDates({ nextStartAt: new Date(data.status.customStatusExpiresAt) }, { includeTime: true }),
              };
              setClearAfterOptions([newOption, ...clearAfterOptions]);
            }

            resetForm({
              customStatus: data.status.customStatus,
              clearAfter: data.status.customStatusExpiresAt ? ClearAfter.custom : ClearAfter.never,
            });
          },
        });
      }
    }
  }, [loadingProfile]);

  const getExpiredAtDate = (clearAfterValue: ClearAfter): Date | null => {
    const four = 4;
    const thirty = 30;

    const now = new Date();
    switch (clearAfterValue) {
      case ClearAfter.today:
        now.setDate(now.getDate() + 1);
        break;
      case ClearAfter.fourHours:
        now.setHours(now.getHours() + four);
        break;
      case ClearAfter.oneHour:
        now.setHours(now.getHours() + 1);
        break;
      case ClearAfter.thirtyMinutes:
        now.setMinutes(now.getMinutes() + thirty);
        break;
      case ClearAfter.never:
        return null;
      case ClearAfter.custom:
        return currentStatus.customStatusExpiresAt ? new Date(currentStatus.customStatusExpiresAt) : null;
      default:
        return null;
    }

    return now;
  };

  const handleSubmit = (formValues: StatusFormValues): void => {
    const customStatusInput: UpdateCustomStatusInput = {
      customStatus: formValues.customStatus,
      customStatusExpiresAt: getExpiredAtDate(formValues.clearAfter)
        ? getExpiredAtDate(formValues.clearAfter)?.toISOString()
        : null,
    };

    if (profile) {
      void updateCustomStatus({
        variables: { input: customStatusInput, userId: profile.userId },
        onCompleted: closeDialog,
        onError: () => showToast(t("error.generic")),
      });
    }
  };

  return (
    <DialogFrame persistent aria-labelledby={`${dialogName}-title`}>
      <LoadingBackdrop open={loadingProfile || loadingCurrentStatus || loading} borderRadius={borderRadius.default} />

      <FormContainer formContext={formContext} onSuccess={handleSubmit}>
        <Stack spacing={4} padding={6} paddingBottom={!hasStatus ? 0 : undefined}>
          <Typography id={`${dialogName}-title`} variant="h6">
            {t("form.title.customStatus")}
          </Typography>
          <TextFieldElement
            name="customStatus"
            id="input-custom-status"
            fullWidth
            label={`${t("form.label.customStatus")}`}
            inputProps={{
              maxLength: 100,
              onChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setHasStatus(false),
            }}
            required
          />
          <SelectElement
            name="clearAfter"
            id="input-clear-after"
            label={`${t("form.label.clearAfter")}`}
            options={clearAfterOptions}
            inputProps={{
              onChange: (_event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setHasStatus(false),
            }}
            SelectProps={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              IconComponent: props => <ArrowDown2 {...props} />,
            }}
            required
          />

          {hasStatus && (
            <Stack paddingTop={2}>
              <LoadingButton
                onClick={() => handleSubmit({ ...currentStatus, customStatus: null, clearAfter: ClearAfter.never })}
                fullWidth
                variant="contained"
                size="large"
                loading={loading}
                loadingIndicator={<LoadingIndicator size="40px" />}>
                {t("cta.clearStatus")}
              </LoadingButton>
            </Stack>
          )}
        </Stack>
        <Stack paddingRight={6} paddingLeft={6}>
          {!hasStatus && (
            <FormConfirmationButtons cancelButtonProps={{ onClick: closeDialog }} confirmButtonProps={{ loading }} />
          )}
        </Stack>
      </FormContainer>
    </DialogFrame>
  );
};

export default CustomStatusDialog;
