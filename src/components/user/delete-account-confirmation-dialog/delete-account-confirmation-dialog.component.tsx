import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@src/components/common/confirmation-dialog/confirmation-dialog.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useRequestDeleteProfile from "@src/hooks/user/use-request-delete-profile.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

const DeleteAccountConfirmationDialog: React.FC = () => {
  const { closeDialog } = useDialog();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const { profile, logUserOut } = useAuthContext();
  const { requestDeleteProfile, loading } = useRequestDeleteProfile();

  const handleDelete = (): void => {
    void requestDeleteProfile({
      variables: { id: profile?.userId },
      onCompleted: () => {
        logUserOut();
      },
      onError: () => {
        showToast(t("error.deleteAccount"), { variant: "error" });
        closeDialog();
      },
    });
  };

  return (
    <ConfirmationDialog
      heading={t("account.permanentlyDelete.label")}
      content={<Typography variant="body2">{t("account.permanentlyDelete.explanation")}</Typography>}
      confirmLabel={t("cta.delete")}
      onConfirm={handleDelete}
      loading={loading}
      handleClose={closeDialog}
    />
  );
};

export default DeleteAccountConfirmationDialog;
