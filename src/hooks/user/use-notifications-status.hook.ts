import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";

interface NotificationsStatusResult {
  notificationsStatus: {
    hasUnseenNotifications: boolean;
  };
}

const notificationsStatusQuery = gql`
  query NotificationsStatus($userId: UserId!) {
    notificationsStatus(userId: $userId) {
      hasUnseenNotifications
    }
  }
`;

function useNotificationsStatus(): {
  getNotificationsStatus: LazyQueryExecFunction<NotificationsStatusResult, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: NotificationsStatusResult;
} {
  const [getNotificationsStatus, { loading, error, data }] = useLazyQuery<NotificationsStatusResult>(
    notificationsStatusQuery,
    {
      context: { clientName: ClientName.user },
      fetchPolicy: "no-cache",
    },
  );

  return { getNotificationsStatus, loading, error, data: data ?? undefined };
}

export default useNotificationsStatus;
