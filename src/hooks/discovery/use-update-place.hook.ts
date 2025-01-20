import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Place } from "@src/common/graphql/generated/discovery.schema.graphql";

interface UpdatePlaceResult {
  updatePlace: Place;
}

const updatePlaceQuery = gql`
  mutation UpdatePlace($id: EntityId!, $input: UpdateCustomPlaceInput!) {
    updatePlace: updateCustomPlace(entityId: $id, input: $input) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

function useUpdatePlace(id?: string): {
  updatePlace: (options?: MutationFunctionOptions<UpdatePlaceResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdatePlaceResult;
} {
  const [updatePlace, { loading, error, data }] = useMutation<UpdatePlaceResult>(updatePlaceQuery, {
    variables: { id },
  });

  return { updatePlace, loading, error, data: data ?? undefined };
}

export default useUpdatePlace;
