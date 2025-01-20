import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import GroupedEventsResultsList from "@src/components/user/grouped-events-results-list/grouped-events-results-list.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useGetInterestedEvents, { InterestedEventsVariables } from "@src/hooks/user/use-get-interested-events.hook";
import { getGroupedEventsVariables } from "@src/utils/grouped-events.util";

const Interested: React.FC = () => {
  const { t } = useTranslation();

  const { profile, loading: profileLoading } = useAuthContext();

  const commonVariables: InterestedEventsVariables = {
    id: profile?.userId ?? "",
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
  };

  return (
    <>
      {!!profile && (
        <GroupedEventsResultsList
          getEvents={useGetInterestedEvents}
          variables={getGroupedEventsVariables(commonVariables)}
          noResultsIndicator={
            <>
              <Typography variant="h5" marginBottom={entitiesResultLayout.titleContentGap}>
                {t("interested.pageTitle")}
              </Typography>
              <NoResultsFound
                title={t("noResults.interested.title")}
                subtitle={t("noResults.interested.subtitle")}
                size="large"
              />
            </>
          }
        />
      )}

      {profileLoading && <LoadingIndicator size="70px" />}
    </>
  );
};

export default Interested;
