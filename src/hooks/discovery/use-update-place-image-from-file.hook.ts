import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreParcelFields } from "@src/common/graphql/fragments.graphql";
import { Place } from "@src/common/graphql/generated/discovery.schema.graphql";

interface UpdatePlaceImageResult {
  updatePlaceImageFromFile: Place;
}

const updatePlaceImagefromFileQuery = gql`
  mutation UpdateCustomPlaceMediaFromFile($entityId: EntityId!, $input: UpdateCustomPlaceMediaFromFileInput!) {
    updatePlaceImageFromFile: updateCustomPlaceMediaFromFile(entityId: $entityId, input: $input) {
      ...CoreParcelFields
    }
  }
  ${coreParcelFields}
`;

function useUpdatePlaceImageFromFile(): {
  updatePlaceImageFromFile: (options?: MutationFunctionOptions<UpdatePlaceImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdatePlaceImageResult;
} {
  const [updatePlaceImageFromFile, { loading, error, data }] = useMutation<UpdatePlaceImageResult>(
    updatePlaceImagefromFileQuery,
    {
      context: {
        isUpload: true,
        headers: {
          "Apollo-Require-Preflight": "true",
        },
      },
    },
  );

  return { updatePlaceImageFromFile, loading, error, data: data ?? undefined };
}

export default useUpdatePlaceImageFromFile;
