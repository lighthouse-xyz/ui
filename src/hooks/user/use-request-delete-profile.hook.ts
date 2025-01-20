import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface RequestDeleteProfileResults {
  requestDeleteProfile: Profile;
}

const requestDeleteProfileQuery = gql`
  mutation RequestDeleteProfile($id: UserId!) {
    requestDeleteProfile(userId: $id) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

function useRequestDeleteProfile(): {
  requestDeleteProfile: (options?: MutationFunctionOptions<RequestDeleteProfileResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: RequestDeleteProfileResults;
} {
  const [requestDeleteProfile, { loading, error, data }] = useMutation<RequestDeleteProfileResults>(
    requestDeleteProfileQuery,
    {
      fetchPolicy: "no-cache",
      context: {
        clientName: ClientName.user,
      },
    },
  );

  return { requestDeleteProfile, loading, error, data: data ?? undefined };
}

export default useRequestDeleteProfile;
