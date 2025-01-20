import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { JumpLocation } from "@src/common/graphql/generated/discovery.schema.graphql";

interface JumpResults {
  jump: JumpLocation;
}

const jumpQuery = gql`
  query Jump($entityId: EntityId!) {
    jump(entityId: $entityId) {
      url
    }
  }
`;

function useJump(entityId: string): {
  getJumpLocation: LazyQueryExecFunction<JumpResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: JumpResults;
} {
  const [getJumpLocation, { loading, error, data }] = useLazyQuery<JumpResults>(jumpQuery, {
    variables: { entityId },
    fetchPolicy: "no-cache",
  });

  return { getJumpLocation, loading, error, data };
}

export default useJump;
