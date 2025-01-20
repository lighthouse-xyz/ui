import { ApolloError, gql, useSubscription } from "@apollo/client";
import { OnboardingStatus } from "@src/common/graphql/generated/user.schema.graphql";

interface OnboardingStateResponse {
  onboardingStateUpdated: OnboardingStatus;
}

interface OnboardingStateVariables {
  userId: string;
}

const onboardingStateSubscription = gql`
  subscription OnboardingStateUpdated($userId: UserId!) {
    onboardingStateUpdated(userId: $userId) {
      stepsUncompleted
    }
  }
`;

function useOnboardingStateUpdated(variables: OnboardingStateVariables): {
  loading: boolean;
  error?: ApolloError;
  data?: OnboardingStateResponse;
} {
  const { loading, error, data } = useSubscription<OnboardingStateResponse, OnboardingStateVariables>(
    onboardingStateSubscription,
    {
      variables,
    },
  );

  return { loading, error, data };
}

export { useOnboardingStateUpdated };
