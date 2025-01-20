import React from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Button, Container, Stack, Typography } from "@mui/material";
import { ReactComponent as SettingsIcon } from "@src/assets/icons/settings-icon.svg";
import paths from "@src/common/paths";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import NotificationsList from "@src/components/user/notifications-list/notifications-list.components";
import { useAuthContext } from "@src/context/auth/auth-context";
import { SettingsTab } from "@src/pages/settings/settings.page";

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { profile } = useAuthContext();

  const areNotificationsTurnedOff =
    !profile?.notificationSettings?.eventGoLive &&
    !profile?.notificationSettings?.follow &&
    !profile?.notificationSettings?.followingActivity &&
    !profile?.notificationSettings?.friendActivity &&
    !profile?.notificationSettings?.ownedEntity;

  return (
    <Container maxWidth="containedPage" disableGutters>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" marginBottom={entitiesResultLayout.titleContentGap}>
          {t("notifications.pageTitle")}
        </Typography>
        <Button
          size="small"
          onClick={() =>
            navigate({
              pathname: paths.settings,
              search: `?${createSearchParams({ tab: SettingsTab.notifications }).toString()}`,
            })
          }>
          <Stack direction="row" spacing={2}>
            <SettingsIcon /> <span>{t("settings.label")}</span>
          </Stack>
        </Button>
      </Stack>
      {!!profile && <NotificationsList userId={profile.userId} areNotificationsTurnedOff={areNotificationsTurnedOff} />}
    </Container>
  );
};

export default Notifications;
