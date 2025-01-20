import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { MarketplaceLocation } from "@src/common/graphql/generated/discovery.schema.graphql";

interface MarketplaceResults {
  marketplace: MarketplaceLocation;
}

const marketplaceQuery = gql`
  query Marketplace($entityId: EntityId!) {
    marketplace(entityId: $entityId) {
      url
    }
  }
`;

function useMarketplace(entityId: string): {
  getMarketplaceLocation: LazyQueryExecFunction<MarketplaceResults, OperationVariables>;
  loading: boolean;
  error: ApolloError | undefined;
  data: MarketplaceResults | undefined;
} {
  const [getMarketplaceLocation, { loading, error, data }] = useLazyQuery<MarketplaceResults>(marketplaceQuery, {
    variables: { entityId },
    fetchPolicy: "no-cache",
  });

  return { getMarketplaceLocation, loading, error, data };
}

export default useMarketplace;
