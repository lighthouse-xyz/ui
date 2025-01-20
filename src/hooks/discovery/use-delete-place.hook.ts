import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { PaginatedPlaces, Place } from "@src/common/graphql/generated/discovery.schema.graphql";

interface DeletePlaceResult {
  deletePlace: Place;
}

const deletePlaceQuery = gql`
  mutation DeletePlace($id: EntityId!) {
    deletePlace: deleteCustomPlace(entityId: $id) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

function useDeletePlace(): {
  deletePlace: (options?: MutationFunctionOptions<DeletePlaceResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: DeletePlaceResult;
} {
  const [deletePlace, { loading, error, data }] = useMutation<DeletePlaceResult>(deletePlaceQuery, {
    fetchPolicy: "no-cache",
    update(cache, variables) {
      cache.modify({
        fields: {
          places(existingPlaces: PaginatedPlaces, { readField }) {
            const newPlaceNodes = existingPlaces.nodes?.filter(
              entity => readField("entityId", entity) !== variables.data?.deletePlace.entityId,
            );

            return {
              ...existingPlaces,
              nodes: newPlaceNodes,
              totalCount:
                existingPlaces.nodes?.length === newPlaceNodes?.length
                  ? existingPlaces.totalCount
                  : existingPlaces.totalCount - 1,
              __typename: existingPlaces.__typename,
            };
          },
        },
      });
    },
  });

  return { deletePlace, loading, error, data: data ?? undefined };
}

export default useDeletePlace;
