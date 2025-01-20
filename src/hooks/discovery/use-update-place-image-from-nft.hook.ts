import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Place } from "@src/common/graphql/generated/discovery.schema.graphql";

interface UpdatePlaceImageResult {
  updatePlaceImageFromNft: Place;
}

const updatePlaceImageFromNftQuery = gql`
  mutation UpdateCustomPlaceImageFromNft($entityId: EntityId!, $input: NftPictureInput!) {
    updatePlaceImageFromNft: updateCustomPlaceImageFromNft(entityId: $entityId, input: $input) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

function useUpdatePlaceImageFromNft(): {
  updatePlaceImageFromNft: (options?: MutationFunctionOptions<UpdatePlaceImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdatePlaceImageResult;
} {
  const [updatePlaceImageFromNft, { loading, error, data }] =
    useMutation<UpdatePlaceImageResult>(updatePlaceImageFromNftQuery);

  return { updatePlaceImageFromNft, loading, error, data: data ?? undefined };
}

export default useUpdatePlaceImageFromNft;
