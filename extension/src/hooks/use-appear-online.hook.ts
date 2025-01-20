import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { statusFields } from "@src/common/graphql/fragments.graphql";
import { Status } from "@src/common/graphql/generated/user.schema.graphql";

import { getLocationStatusQuery } from "./use-get-location-status.hook";

interface AppearOnlineResults {
  appearOnline: Status;
}

const appearOfflineQuery = gql`
  mutation AppearOnline($input: AppearOfflineInput!, $userId: UserId!) {
    appearOnline: appearOffline(input: $input, userId: $userId) {
      ...StatusFields
    }
  }
  ${statusFields}
`;

function useAppearOnline(userId: string): {
  appearOnline: (options?: MutationFunctionOptions<AppearOnlineResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: AppearOnlineResults;
} {
  const [appearOnline, { loading, error, data, client }] = useMutation<AppearOnlineResults>(appearOfflineQuery, {
    variables: { input: { appearOffline: false }, userId },
    update() {
      void client.refetchQueries({
        include: [getLocationStatusQuery],
      });
    },
  });

  return { appearOnline, loading, error, data: data ?? undefined };
}

export default useAppearOnline;
