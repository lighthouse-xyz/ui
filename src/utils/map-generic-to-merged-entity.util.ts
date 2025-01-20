import { GenericEntity } from "../common/graphql/generated/discovery.schema.graphql";
import { defaultName, Entity } from "../common/interfaces/entity.type";
import { getImageOrFallback } from "./image-fallbacks.util";

function mapGenericToMergedEntity(entity: GenericEntity): Entity {
  const mergedEntity = { ...entity } as Entity;

  if ("name" in entity && !entity.name) {
    mergedEntity.name = defaultName;
  }
  if ("image" in entity) {
    mergedEntity.image = getImageOrFallback(entity.image, entity.type, entity.entityId);
  }
  if ("nextStartAt" in entity && entity.nextStartAt) {
    mergedEntity.nextStartAt = new Date(entity.nextStartAt);
  }
  if ("nextFinishAt" in entity && entity.nextFinishAt) {
    mergedEntity.nextFinishAt = new Date(entity.nextFinishAt);
  }

  return mergedEntity;
}

export default mapGenericToMergedEntity;
