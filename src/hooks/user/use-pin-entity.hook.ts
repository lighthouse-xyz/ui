import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userEntityRelationshipFields } from "@src/common/graphql/fragments.graphql";
import { PaginatedPins, UserEntityRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface PinEntityResult {
  pinEntity: UserEntityRelationship;
}

const pinEntityQuery = gql`
  mutation PinEntity($id: UserId!, $input: EntityIdArgs!) {
    pinEntity(input: $input, userId: $id) {
      ...UserEntityRelationshipFields
    }
  }
  ${userEntityRelationshipFields}
`;

function usePinEntity(): {
  pinEntity: (options?: MutationFunctionOptions<PinEntityResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: PinEntityResult;
} {
  const [pinEntity, { loading, error, data }] = useMutation<PinEntityResult>(pinEntityQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.pinEntity.entityId,
        fields: {
          pinned() {
            return true;
          },
        },
      });

      cache.modify({
        fields: {
          pins(existingPins: PaginatedPins, { toReference, storeFieldName }) {
            if (!storeFieldName.includes(variables.data?.pinEntity.userId ?? "")) return existingPins;

            return {
              ...existingPins,
              nodes: [toReference(variables.data?.pinEntity.entityId as string), ...(existingPins.nodes ?? [])],
              totalCount: existingPins.totalCount + 1,
              __typename: existingPins.__typename,
            };
          },
        },
      });
    },
  });

  return { pinEntity, loading, error, data: data ?? undefined };
}

export default usePinEntity;
