import { createContext, useContext } from "react";

import { Filter } from "@src/common/interfaces/filter.interface";
import { NoSortingMethod, ResultsPageContextInterface } from "@src/common/interfaces/results-page-context.interface";

const PeoplePageContext = createContext<ResultsPageContextInterface<NoSortingMethod>>({
  filtersSelected: [],
  setFiltersSelected: (_filters: Filter[]) => {
    return;
  },
  page: 1,
  setPage: (_page: number) => {
    return;
  },
});

const usePeoplePageContext = (): ResultsPageContextInterface<NoSortingMethod> =>
  useContext<ResultsPageContextInterface<NoSortingMethod>>(PeoplePageContext);

export { PeoplePageContext, usePeoplePageContext };
