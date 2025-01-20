import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery, useQuery } from "@apollo/client";
import { coreEstateFields, coreEventFields, coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Entity } from "@src/common/interfaces/entity.type";

interface EntityResult {
  entity: Entity;
}

const getEntityQuery = gql`
  query Entity($id: EntityId!) {
    entity(entityId: $id) {
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
  }
  ${coreEstateFields}
  ${coreEventFields}
  ${coreParcelFields}
`;

function useGetEntity(id: string): {
  loading: boolean;
  error?: ApolloError;
  data?: EntityResult;
} {
  const { loading, error, data } = useQuery<EntityResult>(getEntityQuery, {
    variables: { id },
  });

  return { loading, error, data };
}

function useLazyGetEntity(id?: string): {
  getEntity: LazyQueryExecFunction<EntityResult, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: EntityResult;
} {
  const [getEntity, { loading, error, data }] = useLazyQuery<EntityResult>(getEntityQuery, {
    variables: { id },
  });

  return { getEntity, loading, error, data };
}

export { useGetEntity, useLazyGetEntity };
