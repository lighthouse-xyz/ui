import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface ReportResult {
  report: Profile;
}

const reportQuery = gql`
  mutation Report($entityId: EntityOrUserId!, $input: ReportInput!) {
    report(entityId: $entityId, input: $input) {
      message
    }
  }
`;

function useReport(): {
  report: (options?: MutationFunctionOptions<ReportResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: ReportResult;
} {
  const [report, { loading, error, data }] = useMutation<ReportResult>(reportQuery, {
    context: { clientName: ClientName.user },
    fetchPolicy: "no-cache",
  });

  return { report, loading, error, data: data ?? undefined };
}

export default useReport;
