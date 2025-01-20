import { ApolloError, gql, LazyQueryExecFunction, OperationVariables, useLazyQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { coreProfileFields, notificationSettingsFields } from "@src/common/graphql/fragments.graphql";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";

interface ProfileResults {
  profileFromToken: Profile;
}

export const getProfileQuery = gql`
  query ProfileFromToken($isLogin: Boolean) {
    profileFromToken(isLogin: $isLogin) {
      ...CoreProfileFields
      notificationSettings {
        ...NotificationSettingsFields
      }
    }
  }
  ${coreProfileFields}
  ${notificationSettingsFields}
`;

function useProfileFromToken(): {
  getProfileFromToken: LazyQueryExecFunction<ProfileResults, OperationVariables>;
  loading: boolean;
  error?: ApolloError;
  data?: ProfileResults;
} {
  const [getProfileFromToken, { loading, error, data }] = useLazyQuery<ProfileResults>(getProfileQuery, {
    context: { clientName: ClientName.user },
  });

  return { getProfileFromToken, loading, error, data };
}

export default useProfileFromToken;
