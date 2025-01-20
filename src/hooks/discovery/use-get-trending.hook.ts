import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import {
  coreEstateFields,
  coreEventFields,
  coreMemberFields,
  coreParcelFields,
} from "@src/common/graphql/fragments.graphql";
import { Trending, TrendingType } from "@src/common/interfaces/trending.type";

interface TrendingResults {
  trending: Trending[];
}

const trendingEntitiesQuery = gql`
  query TrendingEntities {
    trending: trendingEntities {
      ... on Estate {
        ...CoreEstateFields
      }
      ... on Event {
        ...CoreEventFields
      }
      ... on Member {
        ...CoreMemberFields
      }
      ... on Parcel {
        ...CoreParcelFields
      }
    }
  }
  ${coreEstateFields}
  ${coreEventFields}
  ${coreMemberFields}
  ${coreParcelFields}
`;

const trendingUsersQuery = gql`
  query TrendingUsers {
    trending: trendingUsers {
      entityId
      handle
      name
    }
  }
`;

const trendingQueries = {
  entities: trendingEntitiesQuery,
  users: trendingUsersQuery,
};

function useGetTrending(type: TrendingType): {
  getTrending: LazyQueryExecFunction<TrendingResults, OperationVariables>;
  results: { data?: TrendingResults; loading: boolean; error?: ApolloError };
} {
  const [getTrending, { loading, error, data }] = useLazyQuery<TrendingResults>(trendingQueries[type]);

  return { getTrending, results: { loading, error, data } };
}

export default useGetTrending;
