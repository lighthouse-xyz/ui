import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { AkuRegistrationResult, RegisterToAkuInput } from "@src/common/graphql/generated/user.schema.graphql";

interface RegisterToAkuResponse {
  registerToAku: AkuRegistrationResult;
}

const registerToAkuQuery = gql`
  mutation RegisterToAku($input: RegisterToAkuInput!) {
    registerToAku(input: $input) {
      email
    }
  }
`;

function useRegisterToAku(): {
  registerToAku: (
    options?: MutationFunctionOptions<RegisterToAkuResponse, { input: RegisterToAkuInput }>,
  ) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: RegisterToAkuResponse;
} {
  const [registerToAku, { loading, error, data }] = useMutation<RegisterToAkuResponse, { input: RegisterToAkuInput }>(
    registerToAkuQuery,
    {
      context: { clientName: ClientName.user },
    },
  );

  return { registerToAku, loading, error, data: data ?? undefined };
}

export default useRegisterToAku;
