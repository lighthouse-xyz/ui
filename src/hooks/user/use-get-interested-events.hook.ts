import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { InterestedFilteringArgs, InterestedSortingMethod } from "@src/common/graphql/generated/user.schema.graphql";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

export interface InterestedEventsVariables {
  id: string;
  first: number;
  offset: number;
  sort?: InterestedSortingMethod;
  where?: InterestedFilteringArgs;
}

const getInterestedEventsQuery = gql`
  query InterestedEvents(
    $first: Int
    $id: UserId!
    $offset: Int
    $sort: InterestedSortingMethod
    $where: InterestedFilteringArgs
  ) {
    entities: interested(first: $first, offset: $offset, sortBy: $sort, userId: $id, where: $where) {
      list: nodes {
        ...CoreEventFields
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreEventFields}
`;

function useGetInterestedEvents(variables: InterestedEventsVariables): QueryEntitiesResults {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(getInterestedEventsQuery, {
    variables,
    context: { clientName: ClientName.user },
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

export default useGetInterestedEvents;
