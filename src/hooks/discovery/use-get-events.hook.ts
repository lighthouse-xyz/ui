import { gql, useQuery } from "@apollo/client";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { EventsVariables } from "@src/common/interfaces/events-variables.interface";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

export const getEventsQuery = gql`
  query Events($first: Int!, $offset: Int, $sort: EventSortingMethod!, $where: EventsFilteringArgs) {
    entities: events(first: $first, offset: $offset, sortBy: $sort, where: $where) {
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

function useGetEvents(variables: EventsVariables): QueryEntitiesResults {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(getEventsQuery, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

export default useGetEvents;
