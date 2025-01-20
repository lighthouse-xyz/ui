import React from "react";
import { useTranslation } from "react-i18next";

import useGetLikes from "../../../hooks/user/use-get-likes.hook";
import NoResultsFound from "../../common/no-results-found/no-results-found.component";
import ResultsList from "../../entities/results-list/results-list.component";
import { entitiesResultLayout } from "@src/common/styles/style.const";

interface Props {
  userId: string;
}

const LikesResultsList: React.FC<Props> = ({ userId }) => {
  const { t } = useTranslation();

  const results = useGetLikes(entitiesResultLayout.itemsPerPage, 0, userId);

  return (
    <ResultsList
      results={results}
      infiniteScroll={{ enabled: true }}
      noResultsIndicator={
        <NoResultsFound title={t("noResults.likes.title")} subtitle={t("noResults.likes.subtitle")} size="large" />
      }
    />
  );
};

export default LikesResultsList;
