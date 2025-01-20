import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { statusFields } from "@src/common/graphql/fragments.graphql";
import { Status } from "@src/common/graphql/generated/user.schema.graphql";
import { getProfileIdFromVariables } from "@src/utils/get-profile-id-from-variables.util";

interface ReportOnlineResult {
  reportOnline: Status;
}

const getReportOnlineQuery = gql`
  mutation ReportOnline($userId: UserId!) {
    reportOnline: reportLiveStatus(userId: $userId) {
      ...StatusFields
    }
  }
  ${statusFields}
`;

function useReportOnline(): {
  reportOnline: (options?: MutationFunctionOptions<ReportOnlineResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: ReportOnlineResult;
} {
  const [reportOnline, { loading, error, data }] = useMutation<ReportOnlineResult>(getReportOnlineQuery, {
    context: { clientName: ClientName.user },
    update(cache, result, options) {
      cache.modify({
        id: getProfileIdFromVariables(options.variables),
        fields: {
          isOnline() {
            return result.data?.reportOnline.isOnline;
          },
        },
      });
    },
  });

  return { reportOnline, loading, error, data: data ?? undefined };
}

export default useReportOnline;
