import { ApolloError, FetchResult, gql, MutationFunctionOptions, useMutation } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { notificationSettingsFields } from "@src/common/graphql/fragments.graphql";
import { NotificationSettings } from "@src/common/graphql/generated/user.schema.graphql";
import { getProfileIdFromVariables } from "@src/utils/get-profile-id-from-variables.util";

interface UpdateNotificationSettingsResponse {
  updateNotificationSettings: NotificationSettings;
}

const updateNotificationSettingsQuery = gql`
  mutation UpdateNotificationSettings($input: NotificationSettingsInput!, $userId: UserId!) {
    updateNotificationSettings(input: $input, userId: $userId) {
      ...NotificationSettingsFields
    }
  }
  ${notificationSettingsFields}
`;

function useUpdateNotificationSettings(): {
  updateNotificationSettings: (
    options?: MutationFunctionOptions<UpdateNotificationSettingsResponse>,
  ) => Promise<FetchResult>;
  loading: boolean;
  error?: ApolloError;
  data?: UpdateNotificationSettingsResponse;
} {
  const [updateNotificationSettings, { loading, error, data }] = useMutation<UpdateNotificationSettingsResponse>(
    updateNotificationSettingsQuery,
    {
      context: {
        clientName: ClientName.user,
      },
      update(cache, result, options) {
        cache.modify({
          id: getProfileIdFromVariables(options.variables),
          fields: {
            notificationSettings() {
              return result.data?.updateNotificationSettings;
            },
          },
        });
      },
    },
  );

  return { updateNotificationSettings, loading, error, data: data ?? undefined };
}

export default useUpdateNotificationSettings;
