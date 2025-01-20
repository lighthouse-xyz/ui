import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import getTitleCase from "@src/utils/convert-camel-case-to-title-case.util";
import { isEvent, isPlace } from "@src/utils/entity.util";
import { useTranslation } from "react-i18next";

import useDeleteEvent from "../discovery/use-delete-event.hook";
import useDeletePlace from "../discovery/use-delete-place.hook";
import useDeleteProfile from "../user/use-delete-profile.hook";
import useDialog from "./use-dialog.hook";
import useToast from "./use-toast.hook";

function useDeleteEntity(type: EntityType): { deleteEntity: (entityId: string) => void; loading: boolean } {
  const { closeDialog } = useDialog();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const { deleteEvent, loading: eventLoading } = useDeleteEvent();
  const { deletePlace, loading: placeLoading } = useDeletePlace();
  const { deleteProfile, loading: profileLoading } = useDeleteProfile();

  const loading = isEvent(type) ? eventLoading : isPlace(type) ? placeLoading : profileLoading;
  const typeLabel = isEvent(type) ? "event" : isPlace(type) ? "place" : "user";

  const deleteEntity = (entityId: string): void => {
    const options = {
      variables: { id: entityId },
      onCompleted: () => {
        showToast(t("form.buttons.delete.success", { type: getTitleCase(typeLabel) }), { variant: "success" });
        closeDialog();
      },
      onError: () => {
        showToast(t("error.delete", { type: typeLabel }), { variant: "error" });
        closeDialog();
      },
    };

    switch (type) {
      case EntityType.event:
        void deleteEvent(options);
        break;
      case EntityType.estate:
      case EntityType.parcel:
        void deletePlace(options);
        break;
      case EntityType.member:
        void deleteProfile(options);
        break;
      default:
        break;
    }
  };

  return { deleteEntity, loading };
}

export default useDeleteEntity;
