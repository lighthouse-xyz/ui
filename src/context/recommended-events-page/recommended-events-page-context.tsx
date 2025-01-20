import { createContext, useContext } from "react";

import { EventSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { ResultsPageContextInterface } from "@src/common/interfaces/results-page-context.interface";

const RecommendedEventsPageContext = createContext<ResultsPageContextInterface<EventSortingMethod>>({
  filtersSelected: [],
  setFiltersSelected: (_filters: Filter[]) => {
    return;
  },
  sortingMethod: EventSortingMethod.mostPopular,
  setSortingMethod: (_sortingMethod: EventSortingMethod) => {
    return;
  },
  page: 1,
  setPage: (_page: number) => {
    return;
  },
});

const useRecommendedEventsPageContext = (): ResultsPageContextInterface<EventSortingMethod> =>
  useContext<ResultsPageContextInterface<EventSortingMethod>>(RecommendedEventsPageContext);

export { RecommendedEventsPageContext, useRecommendedEventsPageContext };
