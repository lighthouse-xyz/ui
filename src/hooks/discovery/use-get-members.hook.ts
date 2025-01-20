import { gql, useQuery } from "@apollo/client";
import { coreMemberFields } from "@src/common/graphql/fragments.graphql";
import { MembersFilteringArgs } from "@src/common/graphql/generated/discovery.schema.graphql";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

interface MembersVariables {
  first: number;
  offset: number;
  where?: MembersFilteringArgs;
}

const getMembersQuery = gql`
  query Members($first: Int!, $offset: Int, $where: MembersFilteringArgs) {
    entities: members(first: $first, offset: $offset, where: $where) {
      list: nodes {
        ... on Member {
          ...CoreMemberFields
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreMemberFields}
`;

function useGetMembers(variables: MembersVariables): QueryEntitiesResults {
  if (variables.where && !Object.keys(variables.where).length) {
    delete variables.where;
  }

  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(getMembersQuery, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

export default useGetMembers;
