import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Entity } from "@src/common/interfaces/entity.type";
import ConfirmationDialog from "@src/components/common/confirmation-dialog/confirmation-dialog.component";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import useDeleteEvent from "@src/hooks/discovery/use-delete-event.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

const DeleteEventConfirmationDialog: React.FC = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { closeDialog } = useDialog();

  const { entity } = location.state as { entity: Entity };

  const { deleteEvent, loading } = useDeleteEvent();

  const handleDelete = (): void => {
    void deleteEvent({
      variables: { id: entity.entityId },
      onCompleted: closeDialog,
      onError: () => {
        showToast(t("error.deleteEvent"), { variant: "error" });
        closeDialog();
      },
    });
  };

  return (
    <ConfirmationDialog
      heading={t("events.permanentlyDelete")}
      content={
        <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ wordBreak: "break-word" }}>
          <WorldLogo world={entity.world} />
          <Typography variant="subtitle2">{entity.name}</Typography>
        </Stack>
      }
      confirmLabel={t("cta.delete")}
      onConfirm={handleDelete}
      loading={loading}
      handleClose={closeDialog}
    />
  );
};

export default DeleteEventConfirmationDialog;
