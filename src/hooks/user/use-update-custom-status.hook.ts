import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { statusFields } from "@src/common/graphql/fragments.graphql";
import { Status } from "@src/common/graphql/generated/user.schema.graphql";
import { getProfileIdFromVariables } from "@src/utils/get-profile-id-from-variables.util";

interface CustomStatusResults {
  updateCustomStatus: Status;
}

const updateCustomStatusQuery = gql`
  mutation UpdateCustomStatus($input: UpdateCustomStatusInput!, $userId: UserId!) {
    updateCustomStatus(input: $input, userId: $userId) {
      ...StatusFields
    }
  }
  ${statusFields}
`;

function useUpdateCustomStatus(): {
  updateCustomStatus: (options?: MutationFunctionOptions<CustomStatusResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: CustomStatusResults;
} {
  const [updateCustomStatus, { loading, error, data }] = useMutation<CustomStatusResults>(updateCustomStatusQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, result, options) {
      cache.modify({
        id: getProfileIdFromVariables(options.variables),
        fields: {
          customStatus() {
            return result.data?.updateCustomStatus.customStatus;
          },
        },
      });
    },
  });

  return { updateCustomStatus, loading, error, data: data ?? undefined };
}

export default useUpdateCustomStatus;
