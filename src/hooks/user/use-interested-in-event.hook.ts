import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { userEntityRelationshipFields } from "@src/common/graphql/fragments.graphql";
import { UserEntityRelationship } from "@src/common/graphql/generated/user.schema.graphql";

interface InterestedInEventResult {
  interestedInEvent: UserEntityRelationship;
}

const interestedInEventQuery = gql`
  mutation InterestedInEvent($id: UserId!, $input: EntityIdArgs!) {
    interestedInEvent(input: $input, userId: $id) {
      ...UserEntityRelationshipFields
    }
  }
  ${userEntityRelationshipFields}
`;

function useInterestedInEvent(): {
  interestedInEvent: (options?: MutationFunctionOptions<InterestedInEventResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: InterestedInEventResult;
} {
  const [interestedInEvent, { loading, error, data }] = useMutation<InterestedInEventResult>(interestedInEventQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, variables) {
      cache.modify({
        id: variables.data?.interestedInEvent.entityId,
        fields: {
          interested() {
            return true;
          },
        },
      });
    },
  });

  return { interestedInEvent, loading, error, data: data ?? undefined };
}

export default useInterestedInEvent;
