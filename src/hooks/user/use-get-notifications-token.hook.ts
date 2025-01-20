import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { NotificationsToken } from "@src/common/graphql/generated/user.schema.graphql";

interface NotificationTokenResponse {
  notificationsToken: NotificationsToken;
}

export const getNotificationsTokenQuery = gql`
  query NotificationsToken {
    notificationsToken {
      token
    }
  }
`;

function useNotificationsToken(): {
  getNotificationsToken: LazyQueryExecFunction<NotificationTokenResponse, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: NotificationTokenResponse;
} {
  const [getNotificationsToken, { loading, error, data }] = useLazyQuery<NotificationTokenResponse>(
    getNotificationsTokenQuery,
    {
      context: { clientName: ClientName.user },
    },
  );

  return { getNotificationsToken, loading, error, data };
}

export default useNotificationsToken;
