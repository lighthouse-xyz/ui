import React from "react";
import { FormContainer } from "react-hook-form-mui";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import DialogFrame from "../dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "../form-confirmation-buttons/form-confirmation-buttons.component";
import { Stack, Typography } from "@mui/material";
import { ReportInput } from "@src/common/graphql/generated/user.schema.graphql";
import useReport from "@src/hooks/user/use-report.hook";
import { useCreateForm } from "@src/hooks/utils/use-create-form/use-create-form.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

const ReportDialog: React.FC = () => {
  const dialogName = `report-dialog`;
  const maxMessageLength = 1000;

  const { t } = useTranslation();
  const { showToast } = useToast();
  const { closeDialog } = useDialog();
  const location = useLocation();

  const { report } = useReport();

  const { entityId } = location.state as { entityId: string };

  const {
    formContext,
    inputCreators: { createTextField },
  } = useCreateForm<ReportInput>();

  const handleSubmit = (input: ReportInput): void => {
    void report({
      variables: { entityId, input },
      onCompleted: () => {
        showToast(t("success.report"), { variant: "success" });
        closeDialog();
      },
      onError: () => {
        showToast(t("error.generic"), { variant: "error" });
        closeDialog();
      },
    });
  };

  return (
    <DialogFrame aria-labelledby={`${dialogName}-title`}>
      <Stack padding={6} paddingBottom={0}>
        <Typography variant="h6" marginBottom={4} id={`${dialogName}-title`}>
          {t("form.title.report")}
        </Typography>

        <FormContainer formContext={formContext} onSuccess={handleSubmit}>
          <Stack>
            <>
              {createTextField({
                varName: "description",
                placeholder: t("form.placeholder.reportDescription"),
                initialCount: 0,
                maxLength: maxMessageLength,
                rows: 6,
                required: true,
              })}
            </>

            <FormConfirmationButtons
              confirmButtonProps={{ label: t("cta.confirmReport") }}
              cancelButtonProps={{ onClick: closeDialog }}
            />
          </Stack>
        </FormContainer>
      </Stack>
    </DialogFrame>
  );
};

export default ReportDialog;
