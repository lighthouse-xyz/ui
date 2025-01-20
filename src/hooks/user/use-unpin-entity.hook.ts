import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userEntityRelationshipFields } from "@src/common/graphql/fragments.graphql";
import { PaginatedPins, UserEntityRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface UnpinEntityResult {
  unpinEntity: UserEntityRelationship;
}

const unpinEntityQuery = gql`
  mutation UnpinEntity($id: UserId!, $input: EntityIdArgs!) {
    unpinEntity(input: $input, userId: $id) {
      ...UserEntityRelationshipFields
    }
  }
  ${userEntityRelationshipFields}
`;

function useUnpinEntity(): {
  unpinEntity: (options?: MutationFunctionOptions<UnpinEntityResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UnpinEntityResult;
} {
  const [unpinEntity, { loading, error, data }] = useMutation<UnpinEntityResult>(unpinEntityQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.unpinEntity.entityId,
        fields: {
          pinned() {
            return false;
          },
        },
      });

      cache.modify({
        fields: {
          pins(existingPins: PaginatedPins, { readField, storeFieldName }) {
            if (!storeFieldName.includes(variables.data?.unpinEntity.userId ?? "")) return existingPins;

            return {
              ...existingPins,
              nodes: existingPins.nodes?.filter(
                entity => readField("entityId", entity) !== variables.data?.unpinEntity.entityId,
              ),
              totalCount: existingPins.totalCount - 1,
              __typename: existingPins.__typename,
            };
          },
        },
      });
    },
  });

  return { unpinEntity, loading, error, data: data ?? undefined };
}

export default useUnpinEntity;
