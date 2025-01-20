import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { JumpLocation } from "@src/common/graphql/generated/discovery.schema.graphql";

interface JumpToUserResults {
  jumpToUser: JumpLocation;
}

const jumpToUserQuery = gql`
  query JumpToUser($userId: UserId!) {
    jumpToUser(userId: $userId) {
      url
    }
  }
`;

function useJumpToUser(userId: string): {
  getJumpToUserLocation: LazyQueryExecFunction<JumpToUserResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: JumpToUserResults;
} {
  const [getJumpToUserLocation, { loading, error, data }] = useLazyQuery<JumpToUserResults>(jumpToUserQuery, {
    variables: { userId },
    fetchPolicy: "no-cache",
  });

  return { getJumpToUserLocation, loading, error, data };
}

export default useJumpToUser;
