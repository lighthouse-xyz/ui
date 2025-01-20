import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { coreEventFields } from "@src/common/graphql/fragments.graphql";
import { Event } from "@src/common/graphql/generated/discovery.schema.graphql";

interface UpdateEventImageResult {
  updateEventImageFromFile: Event;
}

const updateEventImageFromFileQuery = gql`
  mutation UpdateCustomEventMediaFromFile($entityId: EntityId!, $input: UpdateCustomEventMediaFromFileInput!) {
    updateEventImageFromFile: updateCustomEventMediaFromFile(entityId: $entityId, input: $input) {
      ...CoreEventFields
    }
  }
  ${coreEventFields}
`;

function useUpdateEventImageFromFile(): {
  updateEventImageFromFile: (options?: MutationFunctionOptions<UpdateEventImageResult>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateEventImageResult;
} {
  const [updateEventImageFromFile, { loading, error, data }] = useMutation<UpdateEventImageResult>(
    updateEventImageFromFileQuery,
    {
      context: {
        isUpload: true,
        headers: {
          "Apollo-Require-Preflight": "true",
        },
      },
    },
  );

  return { updateEventImageFromFile, loading, error, data: data ?? undefined };
}

export default useUpdateEventImageFromFile;
