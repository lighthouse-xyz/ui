import { DeletedObject } from "@src/common/graphql/generated/user.schema.graphql";

import { isEventId, isParcelId, isUserId } from "./entity.util";

export enum NotificationsTypename {
  profile = "Profile",
  event = "Event",
  parcel = "Parcel",
  estate = "Estate",
  deletedObject = "DeletedObject",
}

export const getDeletedObjectOriginalType = (deletedEntity: DeletedObject): NotificationsTypename => {
  if (isUserId(deletedEntity.entityId)) return NotificationsTypename.profile;
  if (isEventId(deletedEntity.entityId)) return NotificationsTypename.event;
  if (isParcelId(deletedEntity.entityId)) return NotificationsTypename.parcel;
  return NotificationsTypename.estate;
};
