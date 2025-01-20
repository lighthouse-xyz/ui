import { FetchMoreQueryOptions } from "@apollo/client";

export interface FetchVariables {
  offset?: number;
  cursor?: string;
  after?: string;
  first?: number;
}

export interface FetchNotificationVariables {
  after?: string;
  first?: number;
}

export type FetchMoreArgs<TFetchData, TFetchVars = FetchVariables | FetchNotificationVariables> = FetchMoreQueryOptions<
  TFetchVars,
  TFetchData
> & {
  updateQuery?: (
    previousQueryResult: TFetchData,
    options: {
      fetchMoreResult: TFetchData;
    },
  ) => TFetchData;
};
