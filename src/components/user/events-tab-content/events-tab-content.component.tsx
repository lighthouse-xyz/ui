import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import GroupedEventsResultsList from "../grouped-events-results-list/grouped-events-results-list.component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { EventsVariables } from "@src/common/interfaces/events-variables.interface";
import paths from "@src/common/paths";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import useGetEvents from "@src/hooks/discovery/use-get-events.hook";
import { getGroupedEventsVariables } from "@src/utils/grouped-events.util";

interface Props {
  isCurrentUser: boolean;
  userId: string;
}

const EventsTabContent: React.FC<Props> = ({ isCurrentUser, userId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [noResults, setNoResults] = useState(true);

  const getEditButton = (): JSX.Element => {
    return (
      <Button variant="outlined" onClick={() => navigate(paths.yourEvents)}>
        {t("events.edit")}
      </Button>
    );
  };

  const commonVariables: EventsVariables = {
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    where: { ownerUser: userId },
  };

  return (
    <Stack position="relative">
      {isCurrentUser && !noResults && (
        <Box alignSelf="flex-end" position="absolute">
          {getEditButton()}
        </Box>
      )}
      <GroupedEventsResultsList
        getEvents={useGetEvents}
        variables={getGroupedEventsVariables(commonVariables)}
        noResultsIndicator={
          <NoResultsFound
            title={
              isCurrentUser ? t("noResults.eventsTab.title.currentUser") : t("noResults.eventsTab.title.otherUser")
            }
            subtitle={isCurrentUser ? t("noResults.eventsTab.subtitle") : undefined}
            size="small"
            button={isCurrentUser ? getEditButton() : undefined}
          />
        }
        setNoResults={setNoResults}
      />
    </Stack>
  );
};

export default EventsTabContent;
