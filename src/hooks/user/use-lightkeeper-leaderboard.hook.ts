import { gql, LazyQueryExecFunction, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { LightkeeperLeaderboardFilteringArgs } from "@src/common/graphql/generated/user.schema.graphql";
import {
  PaginatedLightkeeperStatsSummary,
  QueryLightkeeperStatsSummaryResults,
} from "@src/common/interfaces/query-results.interface";

interface LightkeeperLeaderboardVariables {
  first: number;
  offset?: number;
  where?: LightkeeperLeaderboardFilteringArgs;
}

export const getLightkeeperLeaderboardQuery = gql`
  query LightkeeperLeaderboard($first: Int, $offset: Int, $where: LightkeeperLeaderboardFilteringArgs) {
    leaderboard: lightkeeperLeaderboard(first: $first, offset: $offset, where: $where) {
      list: nodes {
        lightkeeper {
          ... on Profile {
            alias
            handle
            picture
            userId
            walletAddress
          }
        }
        pointsEarned
        rank
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
`;

function useLightkeeperLeaderboard(): {
  getLeaderboard: LazyQueryExecFunction<PaginatedLightkeeperStatsSummary, LightkeeperLeaderboardVariables>;
  results: QueryLightkeeperStatsSummaryResults;
} {
  const [getLeaderboard, { loading, error, data, networkStatus, fetchMore, refetch }] = useLazyQuery<
    PaginatedLightkeeperStatsSummary,
    LightkeeperLeaderboardVariables
  >(getLightkeeperLeaderboardQuery, {
    context: { clientName: ClientName.user },
    notifyOnNetworkStatusChange: true,
  });

  return { getLeaderboard, results: { loading, error, data, networkStatus, fetchMore, refetch } };
}

export default useLightkeeperLeaderboard;
