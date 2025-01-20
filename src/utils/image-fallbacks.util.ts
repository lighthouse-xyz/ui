import { defaultEntityImage, defaultUserImages } from "../assets/hosted-assets";
import { EntityType } from "../common/graphql/generated/discovery.schema.graphql";
import { getUserIdHashAsNumber } from "./get-user-properties.util";

export function getDefaultUserImage(userId: string): string {
  const userIdHash = getUserIdHashAsNumber(userId);
  return defaultUserImages[userIdHash % defaultUserImages.length];
}

export function getUserImageOrFallback(userId: string, pictureUrl?: string): string {
  return pictureUrl ?? getDefaultUserImage(userId);
}

function validateImage(image: string | undefined): string | undefined {
  const invalidImages = ["https://ui.decentraland.org/dissolved_estate.png"];
  return image && !invalidImages.includes(image) ? image : undefined;
}

export function getImageOrFallback(image: string | undefined, entityType: EntityType, userId: string): string {
  if (entityType === EntityType.member) {
    return getUserImageOrFallback(userId, image);
  } else {
    return validateImage(image) ?? defaultEntityImage;
  }
}
