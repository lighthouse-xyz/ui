import { ApolloError, gql, useQuery } from "@apollo/client";
import { locationStatusFields } from "@src/common/graphql/fragments.graphql";
import { LocationStatus, Status } from "@src/common/graphql/generated/user.schema.graphql";

interface GetLocationStatusResponse {
  locationStatus: LocationStatus;
  status: Pick<Status, "appearOffline">;
}

interface GetLocationStatusVariables {
  userId: string;
}

export const getLocationStatusQuery = gql`
  query LocationStatusExtension($userId: UserId!) {
    locationStatus: locationStatus(userId: $userId) {
      ...LocationStatusFields
    }
    status: status(userId: $userId) {
      appearOffline
    }
  }
  ${locationStatusFields}
`;

function useGetLocationStatus(variables: GetLocationStatusVariables): {
  loading: boolean;
  error?: ApolloError;
  data?: GetLocationStatusResponse;
} {
  const { loading, error, data } = useQuery<GetLocationStatusResponse>(getLocationStatusQuery, {
    variables,
  });

  return { loading, error, data };
}

export default useGetLocationStatus;
