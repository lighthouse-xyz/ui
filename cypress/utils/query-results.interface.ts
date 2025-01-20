import { NotificationSettings, Profile } from "../../src/common/graphql/generated/user.schema.graphql";
import { QueryNotificationsResults } from "../../src/common/interfaces/query-results.interface";

export type NotificationsResults = Omit<QueryNotificationsResults, "error | networkStatus | fetchMore | refetch">;

export interface ProfileResults {
  data: {
    profileFromToken: Profile;
  };
}

export interface UpdateNotificationSettingsResults {
  data: {
    updateNotificationSettings: NotificationSettings;
  };
}
