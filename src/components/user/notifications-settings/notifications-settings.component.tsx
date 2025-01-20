import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import NotificationSettingsItem from "./notification-settings-item/notification-settings-item.component";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NotificationSettings } from "@src/common/graphql/generated/user.schema.graphql";
import { useAuthContext } from "@src/context/auth/auth-context";
import useUpdateNotificationSettings from "@src/hooks/user/use-update-notification-settings.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

// The order of the enum determined the order of the settings are displayed
export enum NotificationActivity {
  followingActivity = "followingActivity",
  friendActivity = "friendActivity",
  eventGoLive = "eventGoLive",
  follow = "follow",
  ownedEntity = "ownedEntity",
}

const NotificationsSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });

  const { profile } = useAuthContext();
  const { updateNotificationSettings, loading } = useUpdateNotificationSettings();

  const [notificationsState, setNotificationsState] = useState<NotificationSettings>(
    profile?.notificationSettings ?? ({} as NotificationSettings),
  );

  const handleToggleChange = (checked: boolean, activity: NotificationActivity): void => {
    setNotificationsState({ ...notificationsState, [activity]: checked });
    void updateNotificationSettings({
      variables: {
        input: { [activity]: checked },
        userId: profile?.userId,
      },
      onError: () => {
        setNotificationsState({ ...notificationsState, [activity]: !checked });
        showToast(t("error.generic"));
      },
    });
  };

  return (
    <Stack spacing={4}>
      <Typography noWrap variant="body1" color="text.secondary">
        {t("notifications.settings.subtitle")}
      </Typography>
      <Stack>
        {Object.values(NotificationActivity).map(activity => {
          return (
            <NotificationSettingsItem
              key={`settings-notifications-${activity}`}
              activity={activity}
              checked={notificationsState?.[activity]}
              onToggleChange={!loading ? handleToggleChange : undefined}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default NotificationsSettings;
