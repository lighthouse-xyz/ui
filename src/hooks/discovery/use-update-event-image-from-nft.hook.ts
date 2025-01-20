import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { Event } from "@src/common/graphql/generated/discovery.schema.graphql";

interface UpdateEventImageResult {
  updateEventImageFromNft: Event;
}

const updateEventImageFromNftQuery = gql`
  mutation UpdateCustomEventImageFromNft($entityId: EntityId!, $input: NftPictureInput!) {
    updateEventImageFromNft: updateCustomEventImageFromNft(entityId: $entityId, input: $input) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

function useUpdateEventImageFromNft(): {
  updateEventImageFromNft: (options?: MutationFunctionOptions<UpdateEventImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateEventImageResult;
} {
  const [updateEventImageFromNft, { loading, error, data }] =
    useMutation<UpdateEventImageResult>(updateEventImageFromNftQuery);

  return { updateEventImageFromNft, loading, error, data: data ?? undefined };
}

export default useUpdateEventImageFromNft;
