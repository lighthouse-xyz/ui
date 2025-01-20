import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { AkuAnswerValidation, ValidateAkuAnswerInput } from "@src/common/graphql/generated/user.schema.graphql";

interface ValidateAkuAnswerResponse {
  validateAkuAnswer: AkuAnswerValidation;
}

const validateAkuAnswerQuery = gql`
  mutation ValidateAkuAnswer($input: ValidateAkuAnswerInput!, $userId: UserId!) {
    validateAkuAnswer(input: $input, userId: $userId) {
      isAnswerValid
      questId
    }
  }
`;

function useValidateAkuAnswer(): {
  validateAnswer: (
    options?: MutationFunctionOptions<ValidateAkuAnswerResponse, { input: ValidateAkuAnswerInput; userId: string }>,
  ) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: ValidateAkuAnswerResponse;
} {
  const [validateAnswer, { loading, error, data }] = useMutation<
    ValidateAkuAnswerResponse,
    { input: ValidateAkuAnswerInput; userId: string }
  >(validateAkuAnswerQuery, {
    context: {
      clientName: ClientName.user,
    },
    update(cache, result, options) {
      cache.modify({
        id: `aku_quest_${result.data?.validateAkuAnswer.questId as string}`,
        fields: {
          answer() {
            if (result.data?.validateAkuAnswer.isAnswerValid) {
              return options.variables?.input.answer;
            }
            return undefined;
          },
        },
      });
    },
  });

  return { validateAnswer, loading, error, data: data ?? undefined };
}

export default useValidateAkuAnswer;
