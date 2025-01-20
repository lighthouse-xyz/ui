import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userEntityRelationshipFields } from "@src/common/graphql/fragments.graphql";
import { UserEntityRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface LikeEntityResult {
  likeEntity: UserEntityRelationship;
}

const likeEntityQuery = gql`
  mutation LikeEntity($id: UserId!, $input: EntityIdArgs!) {
    likeEntity(input: $input, userId: $id) {
      ...UserEntityRelationshipFields
    }
  }
  ${userEntityRelationshipFields}
`;

function useLike(): {
  likeEntity: (options?: MutationFunctionOptions<LikeEntityResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: LikeEntityResult;
} {
  const [likeEntity, { loading, error, data }] = useMutation<LikeEntityResult>(likeEntityQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.likeEntity.entityId,
        fields: {
          liked() {
            return true;
          },
        },
      });
    },
  });

  return { likeEntity, loading, error, data: data ?? undefined };
}

export default useLike;
