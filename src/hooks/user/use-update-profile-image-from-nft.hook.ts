import { ApolloError, DocumentNode, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { ProfileImageFields } from "@src/common/enums/image.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

export enum UpdateImageType {
  updateProfilePicture = "UpdateProfilePicture",
  updateProfileBanner = "UpdateProfileBanner",
}

interface UpdateImageResults {
  updateProfileImage: Profile;
}

const updateProfilePictureFromNftQuery = gql`
  mutation UpdateProfilePictureFromNft($input: UpdatePictureFromNftInput!, $userId: UserId!) {
    updateProfileImage: updateProfilePictureFromNft(input: $input, userId: $userId) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

const updateProfileBannerFromNftQuery = gql`
  mutation UpdateProfileBannerFromNft($input: UpdatePictureFromNftInput!, $userId: UserId!) {
    updateProfileImage: updateProfileBannerFromNft(input: $input, userId: $userId) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

const updateImageQueries: Record<ProfileImageFields, DocumentNode> = {
  banner: updateProfileBannerFromNftQuery,
  picture: updateProfilePictureFromNftQuery,
};

function useUpdateProfileImageFromNft(imageType: ProfileImageFields): {
  updateImage: (options?: MutationFunctionOptions<UpdateImageResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateImageResults;
} {
  const [updateImage, { loading, error, data }] = useMutation<UpdateImageResults>(updateImageQueries[imageType], {
    context: { clientName: ClientName.user },
  });

  return { updateImage, loading, error, data: data ?? undefined };
}

export default useUpdateProfileImageFromNft;
