import { Entity } from "@src/common/interfaces/entity.type";

import { Profile } from "../graphql/generated/user.schema.graphql";

export enum ImageContext {
  profile = "profile",
  entity = "entity",
}

export enum ImageFormat {
  banner = "banner",
  square = "square",
}

export type EntityImageFields = keyof Pick<Entity, "featuredMedia" | "image">;

export type ProfileImageFields = keyof Pick<Profile, "banner" | "picture">;
