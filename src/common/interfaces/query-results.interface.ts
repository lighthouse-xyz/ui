import { ApolloError, ApolloQueryResult, NetworkStatus } from "@apollo/client";
import {
  LightkeeperStatsSummary,
  Notification,
  ReferredUserStats,
} from "@src/common/graphql/generated/user.schema.graphql";

import { Profile } from "../graphql/generated/user.schema.graphql";
import { Entity } from "./entity.type";
import { FetchMoreArgs } from "./fetch-more-args.type";
import { Nft } from "./nft.interface";

export type ItemsFieldName =
  | "entities"
  | "following"
  | "friends"
  | "leaderboard"
  | "notifications"
  | "openInvites"
  | "referrals";

export type PaginatedList<
  T extends
    | { entity: Entity }
    | Entity
    | LightkeeperStatsSummary
    | Nft
    | Notification
    | Profile
    | ReferredUserStats = Entity,
  K extends ItemsFieldName = "entities",
> = {
  [k in K]: {
    list?: T[];
    totalCount: number;
    pageInfo?: {
      hasNextPage: boolean;
    };
    next?: string;
    prev?: string;
    __typename?: string;
  };
};

interface QueryResults<DataType> {
  data?: DataType;
  loading: boolean;
  error?: ApolloError;
  networkStatus?: NetworkStatus;
  fetchMore?: (args: FetchMoreArgs<DataType>) => Promise<ApolloQueryResult<DataType>>;
  refetch?: () => Promise<ApolloQueryResult<DataType>>;
}

export type QueryEntitiesResults<T extends { entity: Entity } | Entity = Entity> = QueryResults<PaginatedList<T>>;

export type QueryNftsResults = QueryResults<PaginatedList<Nft>>;

export type QueryProfilesResults = QueryResults<PaginatedList<Profile>>;

export type PaginatedConnections = PaginatedList<Profile, "following" | "friends" | "openInvites">;
export type QueryConnectionsResults = QueryResults<PaginatedConnections>;

export type QueryNotificationsResults = QueryResults<PaginatedList<Notification, "notifications">>;

export type PaginatedLightkeeperStatsSummary = PaginatedList<LightkeeperStatsSummary, "leaderboard">;
export type QueryLightkeeperStatsSummaryResults = QueryResults<PaginatedLightkeeperStatsSummary>;

export type PaginatedReferredUserStats = PaginatedList<ReferredUserStats, "referrals">;
export type QueryReferredUserStatsResults = QueryResults<PaginatedReferredUserStats>;
