import React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@mui/material/Typography";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import ResultsList from "@src/components/entities/results-list/results-list.component";
import { useJumpHistory } from "@src/hooks/user/use-jump-history.hook";
import useDate from "@src/hooks/utils/use-date.hook";

interface Props {
  userId: string;
}

const JumpHistoryResultsList: React.FC<Props> = ({ userId }) => {
  const { t } = useTranslation();
  const { getDaysFromNow, formatDates } = useDate();

  const results = useJumpHistory({ first: entitiesResultLayout.itemsPerPage, offset: 0, id: userId });

  return (
    <ResultsList
      results={results}
      infiniteScroll={{ enabled: true }}
      groupedBy={element => [getDaysFromNow(element.lastJumpDate), formatDates({ nextStartAt: element.lastJumpDate })]}
      noResultsIndicator={
        <>
          <Typography variant="h5" marginBottom={entitiesResultLayout.titleContentGap}>
            {t("jumpHistory.pageTitle")}
          </Typography>
          <NoResultsFound
            title={t("noResults.jumpHistory.title")}
            subtitle={t("noResults.jumpHistory.subtitle")}
            size="large"
          />
        </>
      }
    />
  );
};

export default JumpHistoryResultsList;
