import { gql, useQuery } from "@apollo/client";
import { coreEstateFields, coreEventFields, coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { EntityType } from "@src/common/graphql/generated/user.schema.graphql";
import { EventRecommendationsVariables } from "@src/common/interfaces/events-variables.interface";
import { PlaceRecommendationsVariables } from "@src/common/interfaces/places-variables.interface";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";
import { useVrContext } from "@src/context/vr/vr-context";
import { compatibleWorldsInVr } from "@src/utils/worlds.util";

interface RecommendedPlaces {
  type: EntityType.parcel;
  variables: PlaceRecommendationsVariables;
}

interface RecommendedEvents {
  type: EntityType.event;
  variables: EventRecommendationsVariables;
}

type RecommendationsVariables = RecommendedPlaces | RecommendedEvents;

const getPlaceRecommendationsQuery = gql`
  query PlaceRecommendations(
    $first: Int!
    $offset: Int
    $sort: PlaceSortingMethod!
    $where: PlaceRecommendationsFilteringArgs
  ) {
    entities: placeRecommendations(first: $first, offset: $offset, sortBy: $sort, where: $where) {
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

const getEventRecommendationsQuery = gql`
  query EventRecommendations(
    $first: Int!
    $offset: Int
    $sort: EventSortingMethod!
    $where: EventRecommendationsFilteringArgs
  ) {
    entities: eventRecommendations(first: $first, offset: $offset, sortBy: $sort, where: $where) {
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

function useGetRecommendations(recommendedVariables: RecommendationsVariables): QueryEntitiesResults {
  const { vrMode } = useVrContext();

  let variables = recommendedVariables.variables;

  if (vrMode && !variables.where?.worlds) {
    variables = { ...variables, where: { ...variables.where, worlds: compatibleWorldsInVr } };
  }

  if (variables.where && !Object.keys(variables.where).length) {
    delete variables.where;
  }

  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(
    recommendedVariables.type === EntityType.parcel ? getPlaceRecommendationsQuery : getEventRecommendationsQuery,
    {
      variables,
      notifyOnNetworkStatusChange: true,
    },
  );

  return { loading, error, data, networkStatus, fetchMore };
}

export { useGetRecommendations };
