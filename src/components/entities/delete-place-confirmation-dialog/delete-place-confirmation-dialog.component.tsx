import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { CustomList, CustomListItem, CustomStack } from "./delete-place-confirmation-dialog.style";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EventSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import Alert from "@src/components/common/alert/alert.component";
import ConfirmationDialog from "@src/components/common/confirmation-dialog/confirmation-dialog.component";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import useDeletePlace from "@src/hooks/discovery/use-delete-place.hook";
import useGetEvents from "@src/hooks/discovery/use-get-events.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

const DeletePlaceConfirmationDialog: React.FC = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { closeDialog } = useDialog();

  const { entity } = location.state as { entity: Entity };

  const { deletePlace, loading } = useDeletePlace();

  const handleDelete = (): void => {
    void deletePlace({
      variables: { id: entity.entityId },
      onCompleted: closeDialog,
      onError: () => {
        showToast(t("error.deletePlace"), { variant: "error" });
        closeDialog();
      },
    });
  };

  const variables = {
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    sort: EventSortingMethod.mostPopular,
    where: {
      parcelId: entity.entityId,
    },
  };

  const { data } = useGetEvents(variables);
  const tiedEvents = data?.entities.list;
  const tiedEventsCount = data?.entities.totalCount;
  const hasTiedEvents = !!tiedEvents && tiedEvents?.length > 0 && !!tiedEventsCount && tiedEventsCount > 0;
  const isTiedEventsLimitReached = !!tiedEventsCount && tiedEventsCount > entitiesResultLayout.itemsPerPage;

  return (
    <ConfirmationDialog
      heading={t("places.permanentlyDelete")}
      content={
        <Stack spacing={6}>
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ wordBreak: "break-word" }}>
            <WorldLogo world={entity.world} />
            <Typography variant="subtitle2">{entity.name}</Typography>
          </Stack>

          {hasTiedEvents && (
            <CustomStack>
              <Alert
                severity="warning"
                title={t("warning.eventsTiedToPlace", { tiedEventsCount, count: tiedEventsCount })}
                content={
                  <CustomList>
                    {tiedEvents?.map((event, index) => (
                      <CustomListItem key={`tied-event-${event.entityId}-${index}`}>
                        {event.name}
                        {event.url}
                      </CustomListItem>
                    ))}
                    {isTiedEventsLimitReached && (
                      <CustomListItem key={`tied-event-${entitiesResultLayout.itemsPerPage + 1}`}>
                        {"..."}
                      </CustomListItem>
                    )}
                  </CustomList>
                }></Alert>
            </CustomStack>
          )}
        </Stack>
      }
      confirmLabel={t("cta.delete")}
      onConfirm={handleDelete}
      loading={loading}
      handleClose={closeDialog}
    />
  );
};

export default DeletePlaceConfirmationDialog;
