import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import {
  coreEstateFields,
  coreEventFields,
  coreParcelFields,
  coreProfileFields,
} from "@src/common/graphql/fragments.graphql";
import { Notification, QueryNotificationsArgs } from "@src/common/graphql/generated/user.schema.graphql";
import { PaginatedList, QueryNotificationsResults } from "@src/common/interfaces/query-results.interface";
import { useStreamContext } from "@src/context/stream/stream-context";

export const getNotificationsQuery = gql`
  query Notifications($after: String, $first: Int, $userId: UserId!) {
    notifications(after: $after, first: $first, userId: $userId) {
      list: nodes {
        activityId
        actor {
          ...CoreEventFields
          ...CoreProfileFields
          ... on DeletedObject {
            entityId
          }
        }
        id
        isRead
        isSeen
        object {
          ...CoreEstateFields
          ...CoreEventFields
          ...CoreParcelFields
          ...CoreProfileFields
          ... on DeletedObject {
            entityId
          }
        }
        time
        verb
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${coreEventFields}
  ${coreProfileFields}
  ${coreEstateFields}
  ${coreParcelFields}
`;

function useNotifications(variables: QueryNotificationsArgs): QueryNotificationsResults {
  const streamContext = useStreamContext();

  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList<Notification, "notifications">>(
    getNotificationsQuery,
    {
      variables,
      notifyOnNetworkStatusChange: true,
      context: { clientName: ClientName.user },
      onCompleted: () => streamContext.connectedToStream && streamContext.setNotificationsAsSeen(),
    },
  );
  return { loading, error, data, networkStatus, fetchMore };
}

export default useNotifications;
