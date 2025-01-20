import React from "react";
import { useTranslation } from "react-i18next";

import DialogFrame from "../dialog-frame/dialog-frame.component";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, Typography } from "@mui/material";

interface Props {
  heading: string;
  content?: JSX.Element;
  confirmLabel: string;
  onConfirm: () => void;
  loading?: boolean;
  handleClose: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
  heading,
  content,
  confirmLabel,
  onConfirm,
  loading = false,
  handleClose,
}) => {
  const dialogName = `confirm-${confirmLabel}-dialog`;

  const { t } = useTranslation();

  return (
    <DialogFrame onClose={handleClose} aria-labelledby={`${dialogName}-title`}>
      <Stack padding={6} spacing={4}>
        <Typography variant="h6" id={`${dialogName}-title`}>
          {heading}
        </Typography>
        {content}
        <Stack direction="row" spacing={2} paddingTop={4}>
          <Button fullWidth variant="outlined" size="large" disabled={loading} onClick={handleClose}>
            {t("cta.cancel")}
          </Button>
          <LoadingButton fullWidth variant="contained" color="error" size="large" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </LoadingButton>
        </Stack>
      </Stack>
    </DialogFrame>
  );
};

export default ConfirmationDialog;
