import { gql, LazyQueryExecFunction, OperationVariables, useLazyQuery, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreEstateFields, coreEventFields, coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";

interface JumpHistoryVariables {
  id: string;
  first: number;
  offset: number;
}

interface EntityJumpLog {
  entity: Entity;
  lastJumpDate: Date;
}

const jumpHistoryQuery = gql`
  query JumpHistory($first: Int, $id: UserId!, $offset: Int) {
    entities: jumpHistory(first: $first, offset: $offset, userId: $id) {
      list: nodes {
        entity {
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
        lastJumpDate
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

function useJumpHistory(variables: JumpHistoryVariables): QueryEntitiesResults<EntityJumpLog> {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList<EntityJumpLog>>(jumpHistoryQuery, {
    variables,
    context: { clientName: ClientName.user },
    notifyOnNetworkStatusChange: true,
  });

  return { loading, error, data, networkStatus, fetchMore };
}

function useLazyJumpHistory(variables?: JumpHistoryVariables): {
  getJumpHistory: LazyQueryExecFunction<PaginatedList<EntityJumpLog>, OperationVariables>;
  results: QueryEntitiesResults<EntityJumpLog>;
} {
  const [getJumpHistory, { loading, error, data }] = useLazyQuery<PaginatedList<EntityJumpLog>>(jumpHistoryQuery, {
    variables,
    context: { clientName: ClientName.user },
  });

  return { getJumpHistory, results: { loading, error, data } };
}

export { useJumpHistory, useLazyJumpHistory };
