import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { LogoutFromExtensionResult } from "@src/common/graphql/generated/user.schema.graphql";

interface LogoutResponse {
  logout: LogoutFromExtensionResult;
}

const logoutQuery = gql`
  mutation Logout {
    logout: logoutFromExtension {
      tokensFlushed
    }
  }
`;

function useLogout(): {
  logout: (options?: MutationFunctionOptions<LogoutResponse>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: LogoutResponse;
} {
  const [logout, { loading, error, data }] = useMutation<LogoutResponse>(logoutQuery);

  return { logout, loading, error, data: data ?? undefined };
}

export default useLogout;
