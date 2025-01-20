import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { JumpLocation } from "@src/common/graphql/generated/discovery.schema.graphql";

interface JumpNowResults {
  jumpNow: JumpLocation;
}

const jumpNowQuery = gql`
  query JumpNow($location: JumpNowLocation!, $vrMode: Boolean, $worlds: [World!]) {
    jumpNow(location: $location, vrMode: $vrMode, worlds: $worlds) {
      url
    }
  }
`;

function useJumpNow(): {
  getJumpNowLocation: LazyQueryExecFunction<JumpNowResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: JumpNowResults;
} {
  const [getJumpNowLocation, { loading, error, data }] = useLazyQuery<JumpNowResults>(jumpNowQuery, {
    fetchPolicy: "no-cache",
  });

  return { getJumpNowLocation, loading, error, data };
}

export default useJumpNow;
