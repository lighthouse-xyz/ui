import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Stack, Typography } from "@mui/material";
import { EventsVariables, GroupedEventVariables } from "@src/common/interfaces/events-variables.interface";
import { QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import ResultsList from "@src/components/entities/results-list/results-list.component";
import { InterestedEventsVariables } from "@src/hooks/user/use-get-interested-events.hook";

type VariablesType = InterestedEventsVariables | EventsVariables;

interface Props<Variables> {
  getEvents: (variables: Variables) => QueryEntitiesResults;
  variables: GroupedEventVariables<Variables>;
  noResultsIndicator: JSX.Element;
  editableEntities?: boolean;
  setNoResults?: (noResults: boolean) => void;
}

const GroupedEventsResultsList = <Variables extends VariablesType>({
  getEvents,
  variables,
  noResultsIndicator,
  editableEntities = false,
  setNoResults,
}: Props<Variables>): JSX.Element => {
  const { t } = useTranslation();

  const [fullyLoadedLive, setFullyLoadedLive] = useState(false);
  const [fullyLoadedScheduled, setFullyLoadedScheduled] = useState(false);

  const [now] = useState(new Date().toISOString());

  const liveEventsResults = getEvents(variables.live(now));
  const scheduledEventsResults = getEvents(variables.scheduled(now));
  const pastEventResults = getEvents(variables.past(now));

  const noResults =
    liveEventsResults.data?.entities.totalCount === 0 &&
    scheduledEventsResults.data?.entities.totalCount === 0 &&
    pastEventResults.data?.entities.totalCount === 0;

  useEffect(() => {
    if (setNoResults && !liveEventsResults.loading && !scheduledEventsResults.loading && !pastEventResults.loading) {
      setNoResults(noResults);
    }
  }, [liveEventsResults.loading, scheduledEventsResults.loading, pastEventResults.loading]);

  return (
    <>
      <Stack spacing={entitiesResultLayout.titleContentGap}>
        {((liveEventsResults.data && liveEventsResults.data.entities.totalCount > 0) || liveEventsResults.error) && (
          <Typography variant="h5">{t("events.type.live")}</Typography>
        )}
        <ResultsList
          results={liveEventsResults}
          infiniteScroll={{ enabled: true, setFullyLoaded: setFullyLoadedLive }}
          noResultsIndicator={<></>}
          editableEntities={editableEntities}
        />

        {fullyLoadedLive && (
          <>
            {((scheduledEventsResults.data && scheduledEventsResults.data.entities.totalCount > 0) ||
              scheduledEventsResults.error) && <Typography variant="h5">{t("events.type.scheduled")}</Typography>}
            <ResultsList
              results={scheduledEventsResults}
              infiniteScroll={{ enabled: true, setFullyLoaded: setFullyLoadedScheduled }}
              noResultsIndicator={<></>}
              editableEntities={editableEntities}
            />
          </>
        )}

        {fullyLoadedLive && fullyLoadedScheduled && (
          <>
            {((pastEventResults.data && pastEventResults.data.entities.totalCount > 0) || pastEventResults.error) && (
              <Typography variant="h5">{t("events.type.past")}</Typography>
            )}
            <ResultsList
              results={pastEventResults}
              infiniteScroll={{ enabled: true }}
              noResultsIndicator={<></>}
              editableEntities={editableEntities}
            />
          </>
        )}
      </Stack>

      {noResults && noResultsIndicator}
    </>
  );
};

export default GroupedEventsResultsList;
