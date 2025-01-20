import { ApolloError, ApolloQueryResult, gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { isOnlineFieldFromProfile, locationStatusFields } from "@src/common/graphql/fragments.graphql";
import { LocationStatus, Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface GetLocationStatusResponse {
  locationStatus: LocationStatus;
  profile: Pick<Profile, "isOnline" | "userId">;
}

interface GetLocationStatusVariables {
  userId: string;
}

export const getLocationStatusQuery = gql`
  query LocationStatus($userId: UserId!) {
    locationStatus: locationStatus(userId: $userId) {
      ...LocationStatusFields
    }
    profile: profile(userId: $userId) {
      ...IsOnlineFieldFromProfile
    }
  }
  ${locationStatusFields}
  ${isOnlineFieldFromProfile}
`;

function useGetLocationStatus(variables: GetLocationStatusVariables): {
  loading: boolean;
  error?: ApolloError;
  data?: GetLocationStatusResponse;
  refetch: () => Promise<ApolloQueryResult<GetLocationStatusResponse>>;
} {
  const { loading, error, data, refetch } = useQuery<GetLocationStatusResponse>(getLocationStatusQuery, {
    variables,
    context: { clientName: ClientName.user },
  });

  return { loading, error, data, refetch };
}

export default useGetLocationStatus;
