import { ApolloError, gql, LazyQueryExecFunction, useLazyQuery, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { UserOnboardingState } from "@src/common/graphql/generated/user.schema.graphql";

interface GetUserOnboardingStateResponse {
  userOnboardingState: UserOnboardingState;
}

interface GetUserOnboardingStateVariables {
  userId: string;
}

export const getUserOnboardingStateQuery = gql`
  query UserOnboardingState($userId: UserId!) {
    userOnboardingState(userId: $userId) {
      avatarInviteClaimedAt
      avatarOnboardingClaimedAt
      stepExtensionInstallAt
      stepGateModifAt
      stepInviteFriendAt
      stepPinAt
      userId
    }
  }
`;

function useLazyGetUserOnboardingState(): {
  getOnboardingState: LazyQueryExecFunction<GetUserOnboardingStateResponse, GetUserOnboardingStateVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: GetUserOnboardingStateResponse;
} {
  const [getOnboardingState, { loading, error, data }] = useLazyQuery<
    GetUserOnboardingStateResponse,
    GetUserOnboardingStateVariables
  >(getUserOnboardingStateQuery, {
    context: { clientName: ClientName.user },
  });

  return { getOnboardingState, loading, error, data };
}

function useGetUserOnboardingState(variables: GetUserOnboardingStateVariables): {
  loading: boolean;
  error?: ApolloError;
  data?: GetUserOnboardingStateResponse;
} {
  const { loading, error, data } = useQuery<GetUserOnboardingStateResponse, GetUserOnboardingStateVariables>(
    getUserOnboardingStateQuery,
    {
      variables,
      context: { clientName: ClientName.user },
    },
  );

  return { loading, error, data };
}

export { useGetUserOnboardingState, useLazyGetUserOnboardingState };
