import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface DeleteProfileResults {
  deleteProfile: Profile;
}

const deleteProfileQuery = gql`
  mutation DeleteProfile($id: UserId!) {
    deleteProfile(userId: $id) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

function useDeleteProfile(): {
  deleteProfile: (options?: MutationFunctionOptions<DeleteProfileResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: DeleteProfileResults;
} {
  const [deleteProfile, { loading, error, data }] = useMutation<DeleteProfileResults>(deleteProfileQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  return { deleteProfile, loading, error, data: data ?? undefined };
}

export default useDeleteProfile;
