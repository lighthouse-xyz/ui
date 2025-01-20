import { gql, LazyQueryExecFunction, OperationVariables, useLazyQuery, useQuery } from "@apollo/client";
import {
  coreEstateFields,
  coreEventFields,
  coreMemberFields,
  coreParcelFields,
} from "@src/common/graphql/fragments.graphql";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FeaturedEntityType } from "@src/common/interfaces/featured-entity-type.type";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

const getFeaturedQuery = gql`
  query Featured($vrMode: Boolean) {
    entities: featured(vrMode: $vrMode) {
      list: nodes {
        ... on Estate {
          ...CoreEstateFields
        }
        ... on Event {
          ...CoreEventFields
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
  ${coreEventFields}
  ${coreParcelFields}
`;

const getFeaturedCreatorsQuery = gql`
  query FeaturedCreators {
    entities: featuredCreators {
      list: nodes {
        ...CoreMemberFields
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreMemberFields}
`;

const getFeaturedEventsQuery = gql`
  query FeaturedEvents($vrMode: Boolean) {
    entities: featuredEvents(vrMode: $vrMode) {
      list: nodes {
        ...CoreEventFields
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreEventFields}
`;

const getFeaturedPlacesQuery = gql`
  query FeaturedPlaces($vrMode: Boolean) {
    entities: featuredPlaces(vrMode: $vrMode) {
      list: nodes {
        ...CoreParcelFields
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreParcelFields}
`;

const featuredQueries = {
  ["all"]: getFeaturedQuery,
  [EntityType.event]: getFeaturedEventsQuery,
  [EntityType.member]: getFeaturedCreatorsQuery,
  [EntityType.parcel]: getFeaturedPlacesQuery,
};

function useGetFeatured(type: FeaturedEntityType, vrMode?: boolean): QueryEntitiesResults {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(featuredQueries[type], {
    variables: type !== EntityType.member ? { vrMode } : undefined,
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

function useLazyGetFeatured(
  type: EntityType.event | EntityType.member | EntityType.parcel | "all",
  vrMode?: boolean,
): {
  getFeatured: LazyQueryExecFunction<PaginatedList, OperationVariables>;
  results: QueryEntitiesResults;
} {
  const [getFeatured, { loading, error, data, networkStatus, fetchMore }] = useLazyQuery<PaginatedList>(
    featuredQueries[type],
    {
      variables: type !== EntityType.member ? { vrMode } : undefined,
      notifyOnNetworkStatusChange: true,
    },
  );

  return { getFeatured, results: { loading, error, data, networkStatus, fetchMore } };
}

export { useGetFeatured, useLazyGetFeatured };
