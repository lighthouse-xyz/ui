import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { EntityRelationship, TrendingUserRelationship } from "@src/common/graphql/generated/discovery.schema.graphql";
import { TrendingType } from "@src/common/interfaces/trending.type";

export interface SetTrendingResult {
  setTrending: (TrendingUserRelationship | EntityRelationship)[];
}

const setTrendingEntitiesQuery = gql`
  mutation SetTrendingEntities($input: [EntityId!]!) {
    setTrending: setTrendingEntities(input: $input) {
      entityId
    }
  }
`;

const setTrendingUsersQuery = gql`
  mutation SetTrendingUsers($input: [UserId!]!) {
    setTrending: setTrendingUsers(input: $input) {
      entityId
    }
  }
`;

const setTrendingQueries = {
  entities: setTrendingEntitiesQuery,
  users: setTrendingUsersQuery,
};

function useSetTrending(type: TrendingType): {
  setTrending: (options?: MutationFunctionOptions<SetTrendingResult>) => Promise<FetchResult<SetTrendingResult>>;
  loading: boolean;
  error?: ApolloError;
  data?: SetTrendingResult;
} {
  const [setTrending, { loading, error, data }] = useMutation<SetTrendingResult>(setTrendingQueries[type]);

  return { setTrending, loading, error, data: data ?? undefined };
}

export default useSetTrending;
