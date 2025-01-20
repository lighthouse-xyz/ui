import { ApolloError, ApolloQueryResult, gql, LazyQueryExecFunction, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import {
  LightkeeperStatsSummary,
  LightkeeperStatsSummaryFilteringArgs,
} from "@src/common/graphql/generated/user.schema.graphql";

interface GetLighkeeperStatsSummaryResponse {
  lightkeeperStatsSummary: Pick<
    LightkeeperStatsSummary,
    "dollarsEarned" | "lastUpdatedAt" | "pointsEarned" | "usersReferred"
  >;
}

interface GetLighkeeperStatsSummaryVariables {
  userId: string;
  where?: LightkeeperStatsSummaryFilteringArgs;
}

export const getLightkeeperStatsSummaryQuery = gql`
  query LightkeeperStatsSummary($userId: UserId!, $where: LightkeeperStatsSummaryFilteringArgs) {
    lightkeeperStatsSummary(userId: $userId, where: $where) {
      dollarsEarned
      lastUpdatedAt
      pointsEarned
      usersReferred
    }
  }
`;

function useGetLightkeeperStatsSummary(): {
  getStatsSummary: LazyQueryExecFunction<GetLighkeeperStatsSummaryResponse, GetLighkeeperStatsSummaryVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: GetLighkeeperStatsSummaryResponse;
  refetch: () => Promise<ApolloQueryResult<GetLighkeeperStatsSummaryResponse>>;
} {
  const [getStatsSummary, { loading, error, data, refetch }] = useLazyQuery<
    GetLighkeeperStatsSummaryResponse,
    GetLighkeeperStatsSummaryVariables
  >(getLightkeeperStatsSummaryQuery, {
    context: { clientName: ClientName.user },
  });

  return { getStatsSummary, loading, error, data, refetch };
}

export default useGetLightkeeperStatsSummary;
