import { ApolloQueryResult } from "@apollo/client";
import {
  LightkeeperStatsSummary,
  Notification,
  Profile,
  ReferredUserStats,
} from "@src/common/graphql/generated/user.schema.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import { FetchMoreArgs, FetchVariables } from "@src/common/interfaces/fetch-more-args.type";
import { Nft } from "@src/common/interfaces/nft.interface";
import { ItemsFieldName, PaginatedList } from "@src/common/interfaces/query-results.interface";

function useFetchMore<
  T extends
    | { entity: Entity }
    | Entity
    | LightkeeperStatsSummary
    | Nft
    | Notification
    | Profile
    | ReferredUserStats = Entity,
  K extends ItemsFieldName = "entities",
>(
  fetchMore?: (args: FetchMoreArgs<PaginatedList<T, K>>) => Promise<ApolloQueryResult<PaginatedList<T, K>>>,
  itemsFieldName: ItemsFieldName = "entities",
  setErrorFetchMore?: (error: Error | null) => void,
): { fetchMoreItems: (fetchVars: FetchVariables) => void } {
  const fetchMoreItems = (fetchVars: FetchVariables): void => {
    fetchMore &&
      fetchMore({
        variables: fetchVars,
        updateQuery: (previousResult, options: { fetchMoreResult: PaginatedList<T, K> }) => {
          const newNodes = options.fetchMoreResult[itemsFieldName as K].list;

          return {
            [itemsFieldName]: {
              ...options.fetchMoreResult[itemsFieldName as K],
              list: [...(previousResult?.[itemsFieldName as K].list ?? []), ...(newNodes ?? [])],
              totalCount: previousResult[itemsFieldName as K].totalCount,
              __typename: previousResult[itemsFieldName as K].__typename,
            },
          } as PaginatedList<T, K>;
        },
      }).catch((e: Error) => setErrorFetchMore && setErrorFetchMore(e));
  };

  return { fetchMoreItems };
}
export default useFetchMore;
