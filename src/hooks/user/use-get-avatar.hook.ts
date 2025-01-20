import { ApolloError, gql, LazyQueryExecFunction, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { AvatarClaimedState, ClaimAvatarType } from "@src/common/graphql/generated/user.schema.graphql";

interface GetAvatarResponse {
  claimAndGetAvatar: AvatarClaimedState;
}

interface GetAvatarVariables {
  userId: string;
  step: ClaimAvatarType;
}

export const getAvatarQuery = gql`
  query ClaimAndGetAvatar($step: ClaimAvatarType!, $userId: UserId!) {
    claimAndGetAvatar(step: $step, userId: $userId) {
      avatarClaimedAt
      avatarType
      avatarUrl
      userId
    }
  }
`;

function useGetAvatar(): {
  getAvatar: LazyQueryExecFunction<GetAvatarResponse, GetAvatarVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: GetAvatarResponse;
  variables?: GetAvatarVariables;
} {
  const [getAvatar, { loading, error, data, variables }] = useLazyQuery<GetAvatarResponse, GetAvatarVariables>(
    getAvatarQuery,
    {
      context: { clientName: ClientName.user },
    },
  );

  return { getAvatar, loading, error, data, variables };
}

export default useGetAvatar;
