import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { connectionFieldsFromProfile } from "@src/common/graphql/fragments.graphql";
import { FriendListSortingMethod, RelationListSortingMethod } from "@src/common/graphql/generated/user.schema.graphql";
import { PaginatedConnections, QueryConnectionsResults } from "@src/common/interfaces/query-results.interface";
import { useAuthContext } from "@src/context/auth/auth-context";

interface ConnectionsSidePanelVariables {
  userId?: string;
  firstFriendsAndFollowing: number;
  offset: number;
  followingSortBy?: RelationListSortingMethod;
  friendsSortBy?: FriendListSortingMethod;
}

export const getConnectionsSidePanelConnectedQueries = gql`
  query ConnectionsSidePanelConnected(
    $firstFriendsAndFollowing: Int
    $followingSortBy: RelationListSortingMethod
    $friendsSortBy: FriendListSortingMethod
    $offset: Int
    $userId: UserId!
  ) {
    following(first: $firstFriendsAndFollowing, offset: $offset, sortBy: $followingSortBy, userId: $userId) {
      list: nodes {
        ...ConnectionFieldsFromProfile
        followingStatus
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
    friends(first: $firstFriendsAndFollowing, offset: $offset, sortBy: $friendsSortBy, userId: $userId) {
      list: nodes {
        ...ConnectionFieldsFromProfile
        followingStatus
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
    openInvites {
      list: nodes {
        ...ConnectionFieldsFromProfile
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }

  ${connectionFieldsFromProfile}
`;

const getConnectionsSidePanelQueries = gql`
  query ConnectionsSidePanel {
    openInvites {
      list: nodes {
        ...ConnectionFieldsFromProfile
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }

  ${connectionFieldsFromProfile}
`;

function useGetConnectionsSidePanel(variables: ConnectionsSidePanelVariables): QueryConnectionsResults {
  const { loading: loadingCurrentUser } = useAuthContext();

  const { loading, error, data, networkStatus, fetchMore, refetch } = useQuery<PaginatedConnections>(
    variables.userId ? getConnectionsSidePanelConnectedQueries : getConnectionsSidePanelQueries,
    {
      variables,
      context: { clientName: ClientName.user },
      notifyOnNetworkStatusChange: true,
      skip: loadingCurrentUser,
    },
  );

  return { loading, error, data, networkStatus, fetchMore, refetch };
}

export { useGetConnectionsSidePanel };
