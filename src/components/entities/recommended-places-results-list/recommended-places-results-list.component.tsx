import React from "react";

import ResultsList from "../results-list/results-list.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import {
  EntityType,
  PlaceRecommendationsFilteringArgs,
  PlaceSortingMethod,
  RelationshipToOwner,
  World,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import { useRecommendedPlacesPageContext } from "@src/context/recommended-places-page/recommended-places-page-context";
import { useGetRecommendations } from "@src/hooks/discovery/use-get-recommendations.hook";
import groupBy from "lodash.groupby";

type FilteringArgsKey = keyof Omit<PlaceRecommendationsFilteringArgs, "categories">;

const RecommendedPlacesResultsList: React.FC = () => {
  const { filtersSelected, sortingMethod, page, setPage } = useRecommendedPlacesPageContext();

  const getFilteringArgs = (): PlaceRecommendationsFilteringArgs => {
    const filtersGrouped: { [key in FilterCategory]?: Filter[] } = groupBy(filtersSelected, "category");

    const filteringArgs = {
      relationshipToOwner: filtersGrouped[FilterCategory.createdBy]?.map(f => f.option as RelationshipToOwner),
      worlds: filtersGrouped[FilterCategory.world]?.map(f => f.option as World),
    };
    Object.keys(filteringArgs).forEach(key => {
      if (filteringArgs[key as FilteringArgsKey] === undefined) {
        delete filteringArgs[key as FilteringArgsKey];
      }
    });

    return filteringArgs;
  };

  const variables = {
    first: entitiesResultLayout.itemsPerPage,
    offset: (page - 1) * entitiesResultLayout.itemsPerPage,
    sort: sortingMethod as PlaceSortingMethod,
    where: filtersSelected.length > 0 ? getFilteringArgs() : undefined,
  };

  const results = useGetRecommendations({ type: EntityType.parcel, variables });

  return <ResultsList results={results} page={page} setPage={setPage} />;
};

export default RecommendedPlacesResultsList;
