import React from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EventsVariables } from "@src/common/interfaces/events-variables.interface";
import paths from "@src/common/paths";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import BackButton from "@src/components/common/back-button/back-button.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import GroupedEventsResultsList from "@src/components/user/grouped-events-results-list/grouped-events-results-list.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useGetEvents from "@src/hooks/discovery/use-get-events.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { getGroupedEventsVariables } from "@src/utils/grouped-events.util";

const YourEvents: React.FC = () => {
  const { t } = useTranslation();
  const { navigateToDialog } = useDialog();

  const { profile, loading: profileLoading } = useAuthContext();

  const commonVariables: EventsVariables = {
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    where: { ownerUser: profile?.userId ?? "" },
  };

  return (
    <>
      {!!profile && (
        <>
          <Box alignSelf="flex-start">
            <BackButton
              label={t("profile.backToProfile")}
              destination={paths.profile.buildPath(profile.handle ?? profile.userId)}
            />
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            marginBottom={4}
            marginTop={8}>
            <Typography variant="h5">{t("events.yourEvents.label")}</Typography>
            <Button variant="contained" onClick={() => navigateToDialog(paths.createEvent)}>
              {t("events.create")}
            </Button>
          </Stack>
          <Typography variant="body1" color="text.secondary" marginBottom={8}>
            {t("events.yourEvents.pageDescription")}
          </Typography>

          <GroupedEventsResultsList
            getEvents={useGetEvents}
            variables={getGroupedEventsVariables(commonVariables)}
            noResultsIndicator={<NoResultsFound title={t("noResults.yourEvents.title")} size="large" />}
            editableEntities
          />
        </>
      )}

      {profileLoading && <LoadingIndicator size="70px" />}
    </>
  );
};

export default YourEvents;
