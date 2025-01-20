import { TrendingUser } from "../graphql/generated/discovery.schema.graphql";
import { Entity } from "./entity.type";

export type TrendingType = "entities" | "users";

export type Trending = Entity | TrendingUser;
