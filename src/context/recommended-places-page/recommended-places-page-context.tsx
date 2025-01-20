import { createContext, useContext } from "react";

import { PlaceSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { ResultsPageContextInterface } from "@src/common/interfaces/results-page-context.interface";

const RecommendedPlacesPageContext = createContext<ResultsPageContextInterface<PlaceSortingMethod>>({
  filtersSelected: [],
  setFiltersSelected: (_filters: Filter[]) => {
    return;
  },
  sortingMethod: PlaceSortingMethod.mostPopular,
  setSortingMethod: (_sortingMethod: PlaceSortingMethod) => {
    return;
  },
  page: 1,
  setPage: (_page: number) => {
    return;
  },
});

const useRecommendedPlacesPageContext = (): ResultsPageContextInterface<PlaceSortingMethod> =>
  useContext<ResultsPageContextInterface<PlaceSortingMethod>>(RecommendedPlacesPageContext);

export { RecommendedPlacesPageContext, useRecommendedPlacesPageContext };
