import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreEstateFields, coreEventFields, coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

const getLikesQuery = gql`
  query Likes($first: Int, $id: UserId!, $offset: Int) {
    entities: likes(first: $first, offset: $offset, userId: $id) {
      list: nodes {
        ... on Estate {
          ...CoreEstateFields
        }
        ... on Event {
          ...CoreEventFields
        }
        ... on Parcel {
          ...CoreParcelFields
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreEstateFields}
  ${coreEventFields}
  ${coreParcelFields}
`;

function useGetLikes(first: number, offset: number, userId: string): QueryEntitiesResults {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList>(getLikesQuery, {
    variables: { first, offset, id: userId },
    context: { clientName: ClientName.user },
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

export default useGetLikes;
