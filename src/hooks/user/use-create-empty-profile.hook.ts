import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface CreateEmptyProfileResults {
  createEmptyProfile: Profile;
}

const createEmptyProfileQuery = gql`
  mutation CreateEmptyProfile($input: CreateEmptyProfileInput!) {
    createEmptyProfile(input: $input) {
      ...CoreProfileFields
    }
  }
  ${coreProfileFields}
`;

function useCreateEmptyProfile(): {
  createEmptyProfile: (options?: MutationFunctionOptions<CreateEmptyProfileResults>) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: CreateEmptyProfileResults;
} {
  const [createEmptyProfile, { loading, error, data }] = useMutation<CreateEmptyProfileResults>(
    createEmptyProfileQuery,
    {
      context: {
        clientName: ClientName.user,
      },
    },
  );

  return { createEmptyProfile, loading, error, data: data ?? undefined };
}

export default useCreateEmptyProfile;
