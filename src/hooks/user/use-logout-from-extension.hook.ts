import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { LogoutFromExtensionResult } from "@src/common/graphql/generated/user.schema.graphql";

interface LogoutFromExtensionResponse {
  logoutFromExtension: LogoutFromExtensionResult;
}

const logoutFromExtensionQuery = gql`
  mutation LogoutFromExtension {
    logoutFromExtension {
      tokensFlushed
    }
  }
`;

function useLogoutFromExtension(): {
  logoutFromExtension: (options?: MutationFunctionOptions<LogoutFromExtensionResponse>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: LogoutFromExtensionResponse;
} {
  const [logout, { loading, error, data }] = useMutation<LogoutFromExtensionResponse>(logoutFromExtensionQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  return { logoutFromExtension: logout, loading, error, data: data ?? undefined };
}

export default useLogoutFromExtension;
