import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { ConnectionType } from "@src/common/enums/connections-type.enum";
import { connectionFieldsFromProfile } from "@src/common/graphql/fragments.graphql";
import {
  FriendListSortingMethod,
  Profile,
  RelationListSortingMethod,
} from "@src/common/graphql/generated/user.schema.graphql";
import { PaginatedList, QueryProfilesResults } from "@src/common/interfaces/query-results.interface";

interface ConnectionsVariables {
  userId: string;
  first: number;
  offset: number;
  sortBy?: RelationListSortingMethod | FriendListSortingMethod;
}

const getFollowersQuery = gql`
  query Followers($first: Int, $offset: Int, $sortBy: RelationListSortingMethod, $userId: UserId!) {
    entities: followers(first: $first, offset: $offset, sortBy: $sortBy, userId: $userId) {
      list: nodes {
        ...ConnectionFieldsFromProfile
        followingStatus
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${connectionFieldsFromProfile}
`;

export const getFollowingQuery = gql`
  query Following($first: Int, $offset: Int, $sortBy: RelationListSortingMethod, $userId: UserId!) {
    entities: following(first: $first, offset: $offset, sortBy: $sortBy, userId: $userId) {
      list: nodes {
        ...ConnectionFieldsFromProfile
        followingStatus
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${connectionFieldsFromProfile}
`;

export const getFriendsQuery = gql`
  query Friends($first: Int, $offset: Int, $sortBy: FriendListSortingMethod, $userId: UserId!) {
    entities: friends(first: $first, offset: $offset, sortBy: $sortBy, userId: $userId) {
      list: nodes {
        ...ConnectionFieldsFromProfile
        followingStatus
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${connectionFieldsFromProfile}
`;

const getFollowerRecommendationsQuery = gql`
  query FollowerRecommendations($first: Int, $offset: Int, $userId: UserId!) {
    entities: followerRecommendations(first: $first, offset: $offset, userId: $userId) {
      list: nodes {
        ...ConnectionFieldsFromProfile
        followingStatus
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${connectionFieldsFromProfile}
`;

const getOpenInvitesQuery = gql`
  query OpenInvites {
    entities: openInvites {
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

const connectionsQueries = {
  [ConnectionType.followers]: getFollowersQuery,
  [ConnectionType.following]: getFollowingQuery,
  [ConnectionType.friends]: getFriendsQuery,
  [ConnectionType.followerRecommendations]: getFollowerRecommendationsQuery,
  [ConnectionType.openInvites]: getOpenInvitesQuery,
};

function useGetConnections(connectionType: ConnectionType, variables?: ConnectionsVariables): QueryProfilesResults {
  const { loading, error, data, networkStatus, fetchMore, refetch } = useQuery<PaginatedList<Profile>>(
    connectionsQueries[connectionType],
    {
      variables: connectionType !== ConnectionType.openInvites ? variables : undefined,
      context: { clientName: ClientName.user },
      notifyOnNetworkStatusChange: true,
    },
  );

  return { loading, error, data, networkStatus, fetchMore, refetch };
}

export { useGetConnections };
