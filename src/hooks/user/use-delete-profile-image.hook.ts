import { ApolloError, DocumentNode, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { ProfileImageFields } from "@src/common/enums/image.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface DeleteImageResult {
  deleteProfileImage: Profile;
}

const deleteProfilePictureQuery = gql`
  mutation DeleteProfilePicture($userId: UserId!) {
    deleteProfileImage: deleteProfilePicture(userId: $userId) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

const deleteProfileBannerQuery = gql`
  mutation DeleteProfileBanner($userId: UserId!) {
    deleteProfileImage: deleteProfileBanner(userId: $userId) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

const deleteImageQueries: Record<ProfileImageFields, DocumentNode> = {
  banner: deleteProfileBannerQuery,
  picture: deleteProfilePictureQuery,
};

function useDeleteProfileImage(imageType: ProfileImageFields): {
  deleteImage: (options?: MutationFunctionOptions<DeleteImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: DeleteImageResult;
} {
  const [deleteImage, { loading, error, data }] = useMutation<DeleteImageResult>(deleteImageQueries[imageType], {
    context: { clientName: ClientName.user },
  });

  return { deleteImage, loading, error, data: data ?? undefined };
}

export default useDeleteProfileImage;
