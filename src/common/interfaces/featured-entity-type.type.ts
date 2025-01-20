import { EntityType } from "../graphql/generated/discovery.schema.graphql";

export type FeaturedEntityType = EntityType.event | EntityType.member | EntityType.parcel | "all";
