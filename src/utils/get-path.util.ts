import { EntityType } from "../common/graphql/generated/discovery.schema.graphql";
import paths from "../common/paths";

enum DialogType {
  edit = "edit",
  delete = "delete",
  report = "report",
}

function getDialogPath(entityType: EntityType, dialogType: DialogType): string {
  if (dialogType === DialogType.report) {
    return paths.report;
  }

  const isPlace = entityType === EntityType.parcel || entityType === EntityType.estate;
  const isEvent = entityType === EntityType.event;

  if (dialogType === DialogType.edit) {
    if (isEvent) return paths.editEvent;
    if (isPlace) return paths.editPlace;
  }

  if (dialogType === DialogType.delete) {
    if (isEvent) return paths.deleteEvent;
    if (isPlace) return paths.deletePlace;
  }

  return "";
}

function getEntityPath(entityType: EntityType, entityId: string): string {
  if (entityType === EntityType.member) {
    return `${window.location.origin}${paths.profile.buildPath(entityId)}`;
  }

  return `${window.location.origin}${paths.entityDetails.buildPath(entityId)}`;
}

export { DialogType, getDialogPath, getEntityPath };
