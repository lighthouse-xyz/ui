import React from "react";
import { useTranslation } from "react-i18next";

import NoResultsFound from "../../common/no-results-found/no-results-found.component";
import ResultsList from "../../entities/results-list/results-list.component";
import { PlaceSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import { useGetPlaces } from "@src/hooks/discovery/use-get-places.hook";

interface Props {
  userId: string;
}

const PlacesResultsList: React.FC<Props> = ({ userId }) => {
  const { t } = useTranslation();

  const results = useGetPlaces({
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    sort: PlaceSortingMethod.nameAsc,
    where: { ownerUser: userId },
  });

  return (
    <ResultsList
      results={results}
      infiniteScroll={{ enabled: true }}
      noResultsIndicator={<NoResultsFound title={t("noResults.yourPlaces.title")} size="small" />}
      editableEntities
    />
  );
};

export default PlacesResultsList;
