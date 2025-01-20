import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { TabsWithContent } from "./settings.style";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Stack, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountSettings from "@src/components/user/account-settings/account-settings.component";
import NotificationsSettings from "@src/components/user/notifications-settings/notifications-settings.component";
import useSearchParamsValidation from "@src/hooks/utils/use-search-params-validation.hook";

export enum SettingsTab {
  account = "account",
  notifications = "notifications",
}

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getSettingsTabFromSearchParams } = useSearchParamsValidation(searchParams);

  const [tabValue, setTabValue] = useState<SettingsTab>(getSettingsTabFromSearchParams());

  useEffect(() => {
    setSearchParams({ tab: tabValue });
  }, [tabValue]);

  const handleTabValueChange = (_event: React.SyntheticEvent, newValue: SettingsTab): void => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="containedPage" disableGutters>
      <Stack spacing={8}>
        <Typography variant="h5">{t("settings.label")}</Typography>

        <TabsWithContent>
          <TabContext value={tabValue}>
            <Box borderBottom={1} borderColor="divider" typography="button">
              <TabList onChange={handleTabValueChange} variant="fullWidth" aria-label="settings-tab-list">
                <Tab label={t("account.label")} value={SettingsTab.account} />
                <Tab label={t("notifications.label")} value={SettingsTab.notifications} />
              </TabList>
            </Box>
            <TabPanel value={SettingsTab.account}>
              <AccountSettings />
            </TabPanel>
            <TabPanel value={SettingsTab.notifications}>
              <NotificationsSettings />
            </TabPanel>
          </TabContext>
        </TabsWithContent>
      </Stack>
    </Container>
  );
};

export default Settings;
