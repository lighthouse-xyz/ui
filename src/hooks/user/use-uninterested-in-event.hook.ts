import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userEntityRelationshipFields } from "@src/common/graphql/fragments.graphql";
import { PaginatedInterested, UserEntityRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface UninterestedInEventResult {
  uninterestedInEvent: UserEntityRelationship;
}

const uninterestedInEventQuery = gql`
  mutation UninterestedInEvent($id: UserId!, $input: EntityIdArgs!) {
    uninterestedInEvent(input: $input, userId: $id) {
      ...UserEntityRelationshipFields
    }
  }
  ${userEntityRelationshipFields}
`;

function useUninterestedInEvent(): {
  uninterestedInEvent: (options?: MutationFunctionOptions<UninterestedInEventResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UninterestedInEventResult;
} {
  const [uninterestedInEvent, { loading, error, data }] = useMutation<UninterestedInEventResult>(
    uninterestedInEventQuery,
    {
      context: {
        clientName: ClientName.user,
      },
      update(cache, variables) {
        cache.modify({
          id: variables.data?.uninterestedInEvent.entityId,
          fields: {
            interested() {
              return false;
            },
          },
        });
        cache.modify({
          fields: {
            interested(existingInterested: PaginatedInterested, { readField }) {
              const newInterestedNodes = existingInterested.nodes?.filter(
                entity => readField("entityId", entity) !== variables.data?.uninterestedInEvent.entityId,
              );

              return {
                ...existingInterested,
                nodes: newInterestedNodes,
                totalCount:
                  existingInterested.nodes?.length === newInterestedNodes?.length
                    ? existingInterested.totalCount
                    : existingInterested.totalCount - 1,
                __typename: existingInterested.__typename,
              };
            },
          },
        });
      },
    },
  );

  return { uninterestedInEvent, loading, error, data: data ?? undefined };
}

export default useUninterestedInEvent;
