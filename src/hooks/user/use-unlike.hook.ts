import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userEntityRelationshipFields } from "@src/common/graphql/fragments.graphql";
import { PaginatedLikes, UserEntityRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface UnlikeEntityResult {
  unlikeEntity: UserEntityRelationship;
}

const unlikeEntityQuery = gql`
  mutation UnlikeEntity($id: UserId!, $input: EntityIdArgs!) {
    unlikeEntity(input: $input, userId: $id) {
      ...UserEntityRelationshipFields
    }
  }
  ${userEntityRelationshipFields}
`;

function useUnlike(): {
  unlikeEntity: (options?: MutationFunctionOptions<UnlikeEntityResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UnlikeEntityResult;
} {
  const [unlikeEntity, { loading, error, data }] = useMutation<UnlikeEntityResult>(unlikeEntityQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.unlikeEntity.entityId,
        fields: {
          liked() {
            return false;
          },
        },
      });

      cache.modify({
        fields: {
          likes(existingLikes: PaginatedLikes, { readField }) {
            return {
              ...existingLikes,
              nodes: existingLikes.nodes?.filter(
                entity => readField("entityId", entity) !== variables.data?.unlikeEntity.entityId,
              ),
              totalCount: existingLikes.totalCount - 1,
              __typename: existingLikes.__typename,
            };
          },
        },
      });
    },
  });

  return { unlikeEntity, loading, error, data: data ?? undefined };
}

export default useUnlike;
