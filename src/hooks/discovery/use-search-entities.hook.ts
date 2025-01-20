import { gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import {
  coreEstateFields,
  coreEventFields,
  coreMemberFields,
  coreParcelFields,
} from "@src/common/graphql/fragments.graphql";
import { EntityType, SearchFilteringArgs } from "@src/common/graphql/generated/discovery.schema.graphql";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";
import { useVrContext } from "@src/context/vr/vr-context";
import { compatibleWorldsInVr } from "@src/utils/worlds.util";

const searchEntitiesQuery = gql`
  query SearchEntities($first: Int, $offset: Int, $query: String!, $where: SearchFilteringArgs) {
    entities: search(first: $first, offset: $offset, query: $query, where: $where) {
      list: nodes {
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
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
  ${coreEstateFields}
  ${coreEventFields}
  ${coreMemberFields}
  ${coreParcelFields}
`;

function useSearchEntities(
  query: string,
  first: number,
  offset: number,
  where?: SearchFilteringArgs,
): {
  searchEntities: LazyQueryExecFunction<PaginatedList, OperationVariables>;
  results: QueryEntitiesResults;
} {
  const { vrMode } = useVrContext();

  if (vrMode && !where?.worlds) {
    where = { ...where, worlds: compatibleWorldsInVr };
  }
  if (vrMode && !where?.types) {
    where = { ...where, types: [EntityType.estate, EntityType.event, EntityType.parcel] };
  }

  const [searchEntities, { loading, error, data }] = useLazyQuery<PaginatedList>(searchEntitiesQuery, {
    variables: { query, first, offset, where },
  });

  return { searchEntities, results: { loading, error, data } };
}

export default useSearchEntities;
