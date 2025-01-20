import React from "react";
import { useTranslation } from "react-i18next";

import { NotificationActivity } from "../notifications-settings.component";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from "@src/components/common/switch/switch.component";

interface Props {
  activity: NotificationActivity;
  checked?: boolean;
  onToggleChange?: (checked: boolean, activity: NotificationActivity) => void;
}

const NotificationSettingsItem: React.FC<Props> = ({ activity, checked = false, onToggleChange }) => {
  const { t } = useTranslation();

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    !!onToggleChange && onToggleChange(event.target.checked, activity);
  };

  return (
    <Stack paddingTop={3} direction="row" spacing={4} alignItems="baseline" data-testid="notification-settings-item">
      <Box>
        <Switch
          checked={checked}
          onChange={handleSwitch}
          size="medium"
          style={{ cursor: onToggleChange ? "pointer" : "default" }}
        />
      </Box>
      <Stack direction="column" spacing={3} paddingTop={2}>
        <Typography noWrap variant="subtitle1">
          {t("notifications.settings.activity", { context: `${activity}.label` })}
        </Typography>
        <Typography variant="body1">
          {t("notifications.settings.activity", { context: `${activity}.content` })}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NotificationSettingsItem;
