import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { EntityRelationship, EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FeaturedEntityType } from "@src/common/interfaces/featured-entity-type.type";

export interface SetFeaturedResult {
  setFeatured: EntityRelationship[];
}

const setFeaturedQuery = gql`
  mutation SetFeatured($input: [EntityId!]!, $vrMode: Boolean = false) {
    setFeatured: setFeaturedEntities(input: $input, vrMode: $vrMode) {
      entityId
    }
  }
`;

const setFeaturedCreatorsQuery = gql`
  mutation SetFeaturedCreators($input: [UserId!]!) {
    setFeatured: setFeaturedCreators(input: $input) {
      entityId
    }
  }
`;

const setFeaturedPlacesQuery = gql`
  mutation SetFeaturedPlaces($input: [ParcelId!]!, $vrMode: Boolean = false) {
    setFeatured: setFeaturedPlaces(input: $input, vrMode: $vrMode) {
      entityId
    }
  }
`;

const setFeaturedEventsQuery = gql`
  mutation SetFeaturedEvents($input: [EventId!]!, $vrMode: Boolean = false) {
    setFeatured: setFeaturedEvents(input: $input, vrMode: $vrMode) {
      entityId
    }
  }
`;

const setFeaturedQueries = {
  all: setFeaturedQuery,
  [EntityType.event]: setFeaturedEventsQuery,
  [EntityType.member]: setFeaturedCreatorsQuery,
  [EntityType.parcel]: setFeaturedPlacesQuery,
};

function useSetFeatured(
  type: FeaturedEntityType,
  vrMode?: boolean,
): {
  setFeatured: (options?: MutationFunctionOptions<SetFeaturedResult>) => Promise<FetchResult<SetFeaturedResult>>;
  loading: boolean;
  error?: ApolloError;
  data?: SetFeaturedResult;
} {
  const [setFeatured, { loading, error, data }] = useMutation<SetFeaturedResult>(setFeaturedQueries[type], {
    variables: { vrMode },
  });

  return { setFeatured, loading, error, data: data ?? undefined };
}

export default useSetFeatured;
