import { gql, LazyQueryExecFunction, OperationVariables, useLazyQuery, useQuery } from "@apollo/client";
import { coreEstateFields, coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { PlacesVariables } from "@src/common/interfaces/places-variables.interface";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

const getPlacesQuery = gql`
  query Places($first: Int!, $offset: Int, $sort: PlaceSortingMethod!, $where: PlacesFilteringArgs) {
    entities: places(first: $first, offset: $offset, sortBy: $sort, where: $where) {
      list: nodes {
        ... on Estate {
          ...CoreEstateFields
        }
        ... on Parcel {
          ...CoreParcelFields
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreEstateFields}
  ${coreParcelFields}
`;

function useGetPlaces(variables: PlacesVariables): QueryEntitiesResults {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(getPlacesQuery, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

function useLazyGetPlaces(variables: PlacesVariables): {
  getPlaces: LazyQueryExecFunction<PaginatedList, OperationVariables>;
  results: QueryEntitiesResults;
} {
  const [getPlaces, { loading, error, data }] = useLazyQuery<PaginatedList>(getPlacesQuery, {
    variables,
  });

  return { getPlaces, results: { loading, error, data } };
}

export { getPlacesQuery, useGetPlaces, useLazyGetPlaces };
