import { ApolloError, gql, LazyQueryExecFunction, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userStateFields } from "@src/common/graphql/fragments.graphql";
import { UserState } from "@src/common/graphql/generated/user.schema.graphql";

interface GetUserStateResponse {
  userState: UserState;
}

interface GetUserStateVariables {
  userId: string;
}

export const getUserStateQuery = gql`
  query UserState($userId: UserId!) {
    userState(userId: $userId) {
      ...UserStateFields
    }
  }
  ${userStateFields}
`;

function useGetUserState(): {
  getUserState: LazyQueryExecFunction<GetUserStateResponse, GetUserStateVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: GetUserStateResponse;
} {
  const [getUserState, { loading, error, data }] = useLazyQuery<GetUserStateResponse, GetUserStateVariables>(
    getUserStateQuery,
    {
      context: { clientName: ClientName.user },
    },
  );

  return { getUserState, loading, error, data };
}

export default useGetUserState;
