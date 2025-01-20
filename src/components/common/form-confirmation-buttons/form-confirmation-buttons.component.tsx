import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog.component";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface ConfirmButtonProps {
  disabled?: boolean;
  label?: string;
  loading?: boolean;
  onClick?: () => void;
}

interface CancelButtonProps {
  label?: string;
  onClick?: () => void;
}

interface DeleteButtonProps {
  label: string;
  onDelete: () => void;
}

interface Props {
  confirmButtonProps: ConfirmButtonProps;
  cancelButtonProps: CancelButtonProps;
  deleteButtonProps?: DeleteButtonProps;
}

const FormConfirmationButtons: React.FC<Props> = ({
  confirmButtonProps: { disabled: confirmDisabled, label: confirmLabel, loading, onClick: onConfirm },
  cancelButtonProps: { label: cancelLabel, onClick: onCancel },
  deleteButtonProps,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Grid
      container
      paddingY={6}
      zIndex={theme.zIndex.modal + 1}
      position="sticky"
      bottom={0}
      bgcolor="background.default">
      <Grid item xs marginRight={2}>
        <Button fullWidth variant="outlined" size="large" disabled={loading} onClick={onCancel}>
          {cancelLabel || t("cta.cancel")}
        </Button>
      </Grid>
      <Grid item xs>
        <LoadingButton
          type={"submit"}
          fullWidth
          variant="contained"
          size="large"
          disabled={confirmDisabled}
          loading={loading}
          onClick={onConfirm}>
          {confirmLabel || t("cta.save")}
        </LoadingButton>
      </Grid>
      {!!deleteButtonProps && (
        <>
          <Grid item xs={12} marginTop={2}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              disabled={loading}
              onClick={() => setDialogOpen(true)}>
              {deleteButtonProps.label}
            </Button>
          </Grid>
          {dialogOpen && (
            <ConfirmationDialog
              heading={t("form.buttons.delete.confirmationHeading")}
              content={<Typography variant="body1">{t("form.buttons.delete.confirmationSubheading")}</Typography>}
              confirmLabel={t("form.buttons.delete.confirmButtonLabel")}
              onConfirm={() => {
                deleteButtonProps.onDelete();
                setDialogOpen(false);
              }}
              handleClose={() => setDialogOpen(false)}
            />
          )}
        </>
      )}
    </Grid>
  );
};

export default FormConfirmationButtons;
