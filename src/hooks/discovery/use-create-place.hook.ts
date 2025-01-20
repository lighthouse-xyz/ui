import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Place } from "@src/common/graphql/generated/discovery.schema.graphql";

import { getPlacesQuery } from "./use-get-places.hook";

interface CreatePlaceResult {
  createPlace: Place;
}

const createPlaceQuery = gql`
  mutation CreatePlace($input: CreateCustomPlaceInput!) {
    createPlace: createCustomPlace(input: $input) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

function useCreatePlace(): {
  createPlace: (options?: MutationFunctionOptions<CreatePlaceResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: CreatePlaceResult;
} {
  const [createPlace, { loading, error, data, client }] = useMutation<CreatePlaceResult>(createPlaceQuery, {
    update() {
      void client.refetchQueries({
        include: [getPlacesQuery],
      });
    },
  });

  return { createPlace, loading, error, data: data ?? undefined };
}

export default useCreatePlace;
