import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { statusFields } from "@src/common/graphql/fragments.graphql";
import { Status } from "@src/common/graphql/generated/user.schema.graphql";
import { getProfileIdFromVariables } from "@src/utils/get-profile-id-from-variables.util";

interface AppearOfflineResults {
  appearOffline: Status;
}

const appearOfflineQuery = gql`
  mutation AppearOffline($input: AppearOfflineInput!, $userId: UserId!) {
    appearOffline(input: $input, userId: $userId) {
      ...StatusFields
    }
  }
  ${statusFields}
`;

function useAppearOffline(): {
  appearOffline: (options?: MutationFunctionOptions<AppearOfflineResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: AppearOfflineResults;
} {
  const [appearOffline, { loading, error, data }] = useMutation<AppearOfflineResults>(appearOfflineQuery, {
    context: { clientName: ClientName.user },
    update(cache, result, options) {
      cache.modify({
        id: getProfileIdFromVariables(options.variables),
        fields: {
          isOnline() {
            return result.data?.appearOffline.isOnline;
          },
        },
      });
    },
  });

  return { appearOffline, loading, error, data: data ?? undefined };
}

export default useAppearOffline;
