import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { LocationStatus, UpdateLocationStatusInput } from "@src/common/graphql/generated/user.schema.graphql";

import { getLocationStatusQuery } from "./use-get-location-status.hook";

interface UpdateLocationStatusResult {
  locationStatus: Pick<LocationStatus, "allowsSharingLocation" | "locationSharingType" | "activatePublicLink">;
}

interface UpdateLocationStatusVariables {
  userId: string;
  input: UpdateLocationStatusInput;
}

const updateLocationStatusQuery = gql`
  mutation UpdateLocationStatus($input: UpdateLocationStatusInput!, $userId: UserId!) {
    locationStatus: updateLocationStatus(input: $input, userId: $userId) {
      activatePublicLink
      allowsSharingLocation
      locationSharingType
    }
  }
`;

function useUpdateLocationStatus(): {
  updateLocationStatus: (
    options?: MutationFunctionOptions<UpdateLocationStatusResult, UpdateLocationStatusVariables>,
  ) => Promise<FetchResult<UpdateLocationStatusResult>>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateLocationStatusResult;
} {
  const [updateLocationStatus, { loading, error, data, client }] = useMutation<
    UpdateLocationStatusResult,
    UpdateLocationStatusVariables
  >(updateLocationStatusQuery, {
    update() {
      void client.refetchQueries({
        include: [getLocationStatusQuery],
      });
    },
  });

  return { updateLocationStatus, loading, error, data: data ?? undefined };
}

export default useUpdateLocationStatus;
