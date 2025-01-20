import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import EventsTabContent from "../events-tab-content/events-tab-content.component";
import PlacesTabContent from "../places-tab-content/places-tab-content.component";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Stack } from "@mui/material";
import { ReactComponent as PlacesIcon } from "@src/assets/icons/sign-post-bold-icon.svg";
import ToggleButtonGroup from "@src/components/common/toggle-button-group/toggle-button-group.component";
import { ReactComponent as EventsIcon } from "src/assets/icons/calendar-bold-icon.svg";

enum TabValue {
  events = "events",
  places = "places",
}

interface Props {
  isCurrentUser: boolean;
  userId: string;
}

const ProfileTabs: React.FC<Props> = ({ isCurrentUser, userId }) => {
  const { t } = useTranslation();

  const [value, setValue] = useState<TabValue>(TabValue.places);

  return (
    <Stack spacing={9} minHeight="440px">
      <ToggleButtonGroup
        buttons={[
          { value: TabValue.places, label: t("places.label"), icon: <PlacesIcon /> },
          { value: TabValue.events, label: t("events.label"), icon: <EventsIcon /> },
        ]}
        valueSelected={value}
        setValueSelected={setValue}
        sx={{ maxWidth: "fit-content", alignSelf: "center" }}
      />
      <TabContext value={value}>
        <TabPanel value={TabValue.events} sx={{ padding: 0 }}>
          <EventsTabContent isCurrentUser={isCurrentUser} userId={userId} />
        </TabPanel>
        <TabPanel value={TabValue.places} sx={{ padding: 0 }}>
          <PlacesTabContent isCurrentUser={isCurrentUser} userId={userId} />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default ProfileTabs;
