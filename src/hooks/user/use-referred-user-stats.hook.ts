import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { ReferredUserStatsFilteringArgs } from "@src/common/graphql/generated/user.schema.graphql";
import {
  PaginatedReferredUserStats,
  QueryReferredUserStatsResults,
} from "@src/common/interfaces/query-results.interface";

interface ReferredUserStatsVariables {
  userId: string;
  first?: number;
  offset?: number;
  where?: ReferredUserStatsFilteringArgs;
}

export const referredUserStatsQuery = gql`
  query ReferredUserStats($first: Int, $offset: Int, $userId: UserId!, $where: ReferredUserStatsFilteringArgs) {
    referrals: referredUserStats(first: $first, offset: $offset, userId: $userId, where: $where) {
      list: nodes {
        cameBack
        daysLeft
        dollarsEarned
        extensionLogin
        followedOtherUsers
        jumpedToOtherUsers
        personalizedGate
        pointsEarned
        profile {
          ... on Profile {
            alias
            handle
            picture
            userId
            walletAddress
          }
        }
        progress
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
`;

function useReferredUserStats(variables: ReferredUserStatsVariables): QueryReferredUserStatsResults {
  const { loading, error, data, networkStatus, fetchMore, refetch } = useQuery<
    PaginatedReferredUserStats,
    ReferredUserStatsVariables
  >(referredUserStatsQuery, {
    variables,
    context: { clientName: ClientName.user },
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore, refetch };
}

export default useReferredUserStats;
