import { ApolloError, DocumentNode, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { EntityImageFields } from "@src/common/enums/image.enum";
import { coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Place } from "@src/common/graphql/generated/discovery.schema.graphql";

interface DeletePlaceImageResult {
  deletePlaceImage: Place;
}

const deletePlaceImageQuery = gql`
  mutation DeleteCustomPlaceImage($entityId: EntityId!) {
    deletePlaceImage: deleteCustomPlaceImage(entityId: $entityId) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

const deletePlaceFeaturedMediaQuery = gql`
  mutation DeleteCustomPlaceFeaturedMedia($entityId: EntityId!) {
    deletePlaceFeaturedMedia: deleteCustomPlaceFeaturedMedia(entityId: $entityId) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

const deleteImageQueries: Record<EntityImageFields, DocumentNode> = {
  featuredMedia: deletePlaceFeaturedMediaQuery,
  image: deletePlaceImageQuery,
};

function useDeletePlaceMedia(imageType: EntityImageFields): {
  deleteImage: (options?: MutationFunctionOptions<DeletePlaceImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: DeletePlaceImageResult;
} {
  const [deleteImage, { loading, error, data }] = useMutation<DeletePlaceImageResult>(deleteImageQueries[imageType]);

  return { deleteImage, loading, error, data: data ?? undefined };
}

export default useDeletePlaceMedia;
