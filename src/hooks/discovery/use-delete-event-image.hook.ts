import { ApolloError, DocumentNode, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { EntityImageFields } from "@src/common/enums/image.enum";

import { coreEventFields } from "../../common/graphql/fragments.graphql";
import { Event } from "../../common/graphql/generated/discovery.schema.graphql";

interface DeleteEventImageResult {
  deleteEventImage: Event;
}

const deleteEventImageQuery = gql`
  mutation DeleteCustomEventImage($entityId: EntityId!) {
    deleteEventImage: deleteCustomEventImage(entityId: $entityId) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

const deleteEventFeaturedMediaQuery = gql`
  mutation DeleteCustomEventFeaturedMedia($entityId: EntityId!) {
    deleteEventFeaturedMedia: deleteCustomEventFeaturedMedia(entityId: $entityId) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

const deleteImageQueries: Record<EntityImageFields, DocumentNode> = {
  featuredMedia: deleteEventFeaturedMediaQuery,
  image: deleteEventImageQuery,
};

function useDeleteEventMedia(imageType: EntityImageFields): {
  deleteImage: (options?: MutationFunctionOptions<DeleteEventImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: DeleteEventImageResult;
} {
  const [deleteImage, { loading, error, data }] = useMutation<DeleteEventImageResult>(deleteImageQueries[imageType]);

  return { deleteImage, loading, error, data: data ?? undefined };
}

export default useDeleteEventMedia;
