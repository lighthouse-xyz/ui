import { ApolloError, gql, QueryHookOptions, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { LightkeeperPayPeriods } from "@src/common/graphql/generated/user.schema.graphql";

interface GetLightkeeperPayPeriodsResponse {
  lightkeeperPayPeriods: LightkeeperPayPeriods;
}

interface GetLighkeeperPayPeriodsVariables {
  userId: string;
}

export const getLightkeeperPayPeriodsQuery = gql`
  query LightkeeperPayPeriods($userId: UserId!) {
    lightkeeperPayPeriods(userId: $userId) {
      payPeriods
    }
  }
`;

function useGetLightkeeperPayPeriods(
  options: QueryHookOptions<GetLightkeeperPayPeriodsResponse, GetLighkeeperPayPeriodsVariables>,
): {
  loading: boolean;
  error?: ApolloError;
  data?: GetLightkeeperPayPeriodsResponse;
} {
  const { loading, error, data } = useQuery<GetLightkeeperPayPeriodsResponse, GetLighkeeperPayPeriodsVariables>(
    getLightkeeperPayPeriodsQuery,
    {
      ...options,
      context: { clientName: ClientName.user },
    },
  );

  return { loading, error, data };
}

export default useGetLightkeeperPayPeriods;
