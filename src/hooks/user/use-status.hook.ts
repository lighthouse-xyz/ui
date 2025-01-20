import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { statusFields } from "@src/common/graphql/fragments.graphql";
import { Status } from "@src/common/graphql/generated/user.schema.graphql";

interface StatusResults {
  status: Status;
}

export const getStatusQuery = gql`
  query Status($userId: UserId!) {
    status(userId: $userId) {
      ...StatusFields
    }
  }
  ${statusFields}
`;

function useStatus(): {
  getStatus: LazyQueryExecFunction<StatusResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: StatusResults;
} {
  const [getStatus, { loading, error, data }] = useLazyQuery<StatusResults>(getStatusQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  return { getStatus, loading, error, data };
}

export default useStatus;
