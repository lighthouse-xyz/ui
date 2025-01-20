import { createContext, useContext } from "react";

import { Filter } from "@src/common/interfaces/filter.interface";
import { NoSortingMethod, ResultsPageContextInterface } from "@src/common/interfaces/results-page-context.interface";

const SearchPageContext = createContext<ResultsPageContextInterface<NoSortingMethod>>({
  filtersSelected: [],
  setFiltersSelected: (_filters: Filter[]) => {
    return;
  },
  page: 1,
  setPage: (_page: number) => {
    return;
  },
  query: "",
  setQuery: (_query: string) => {
    return;
  },
  totalCount: null,
  setTotalCount: (_count: number | null) => {
    return;
  },
});

const useSearchPageContext = (): ResultsPageContextInterface<NoSortingMethod> =>
  useContext<ResultsPageContextInterface<NoSortingMethod>>(SearchPageContext);

export { SearchPageContext, useSearchPageContext };
