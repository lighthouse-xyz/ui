import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface UpdateProfileResults {
  updateProfile: Profile;
}

const updateProfileQuery = gql`
  mutation UpdateProfile($id: UserId!, $input: UpdateProfileInput!) {
    updateProfile(input: $input, userId: $id) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

function useUpdateProfile(): {
  updateProfile: (options?: MutationFunctionOptions<UpdateProfileResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateProfileResults;
} {
  const [updateProfile, { loading, error, data }] = useMutation<UpdateProfileResults>(updateProfileQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  return { updateProfile, loading, error, data: data ?? undefined };
}

export default useUpdateProfile;
