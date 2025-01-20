import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface UpdateImageResults {
  updateImagesFromFiles: Profile;
}

const updateProfileImagesFromFiles = gql`
  mutation UpdateProfileMediaFromFile($input: UpdateProfileMediaFromFileInput!, $userId: UserId!) {
    updateImagesFromFiles: updateProfileMediaFromFile(input: $input, userId: $userId) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

function useUpdateProfileImages(): {
  updateImagesFromFiles: (options?: MutationFunctionOptions<UpdateImageResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateImageResults;
} {
  const [updateImagesFromFiles, { loading, error, data }] = useMutation<UpdateImageResults>(
    updateProfileImagesFromFiles,
    {
      context: {
        clientName: ClientName.user,
        isUpload: true,
        headers: {
          "Apollo-Require-Preflight": "true",
        },
      },
    },
  );

  return { updateImagesFromFiles, loading, error, data: data ?? undefined };
}

export default useUpdateProfileImages;
