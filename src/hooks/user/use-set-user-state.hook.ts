import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userStateFields } from "@src/common/graphql/fragments.graphql";
import { SetUserStateInput, UserState } from "@src/common/graphql/generated/user.schema.graphql";

interface SetUserStateResponse {
  setUserState: UserState;
}

interface SetUserStateVariables {
  input: SetUserStateInput;
  userId: string;
}

const setUserStateQuery = gql`
  mutation SetUserState($input: SetUserStateInput!, $userId: UserId!) {
    setUserState(input: $input, userId: $userId) {
      ...UserStateFields
    }
  }
  ${userStateFields}
`;

function useSetUserState(): {
  setUserState: (
    options?: MutationFunctionOptions<SetUserStateResponse, SetUserStateVariables>,
  ) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: SetUserStateResponse;
} {
  const [setUserState, { loading, error, data }] = useMutation<SetUserStateResponse, SetUserStateVariables>(
    setUserStateQuery,
    {
      context: {
        clientName: ClientName.user,
      },
    },
  );

  return { setUserState, loading, error, data: data ?? undefined };
}

export default useSetUserState;
