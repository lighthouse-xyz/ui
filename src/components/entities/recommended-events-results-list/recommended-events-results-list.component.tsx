import React, { useState } from "react";

import ResultsList from "../results-list/results-list.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { When } from "@src/common/enums/when.enum";
import {
  EntityType,
  EventRecommendationsFilteringArgs,
  EventSortingMethod,
  RelationshipToOwner,
  World,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import { useRecommendedEventsPageContext } from "@src/context/recommended-events-page/recommended-events-page-context";
import { useGetRecommendations } from "@src/hooks/discovery/use-get-recommendations.hook";
import { convertWhenToFilteringArgs } from "@src/utils/grouped-events.util";
import groupBy from "lodash.groupby";

type FilteringArgsKey = keyof Omit<EventRecommendationsFilteringArgs, "categories">;

const RecommendedEventsResultsList: React.FC = () => {
  const { filtersSelected, sortingMethod, page, setPage } = useRecommendedEventsPageContext();

  const [now] = useState(new Date().toISOString());

  const getFilteringArgs = (): EventRecommendationsFilteringArgs => {
    const filtersGrouped: { [key in FilterCategory]?: Filter[] } = groupBy(filtersSelected, "category");
    const whens = filtersGrouped[FilterCategory.when]?.map(f => f.option as When);

    const filteringArgs = {
      relationshipToOwner: filtersGrouped[FilterCategory.createdBy]?.map(f => f.option as RelationshipToOwner),
      worlds: filtersGrouped[FilterCategory.world]?.map(f => f.option as World),
      nextFinishAt: { greaterThanOrEqual: now },
      ...convertWhenToFilteringArgs(now, whens?.[0]),
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
    sort: sortingMethod as EventSortingMethod,
    where: getFilteringArgs(),
  };

  const results = useGetRecommendations({ type: EntityType.event, variables });

  return <ResultsList results={results} page={page} setPage={setPage} />;
};

export default RecommendedEventsResultsList;
