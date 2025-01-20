import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAuthContext } from "../auth/auth-context";
import { SearchPageContext } from "./search-page-context";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { Filter } from "@src/common/interfaces/filter.interface";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import useSearchParamsValidation from "@src/hooks/utils/use-search-params-validation.hook";

const SearchPageContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { connected } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const { convertFiltersToSearchParams, convertSearchParamsToFilters, getPageFromSearchParams } =
    useSearchParamsValidation(searchParams);

  const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");
  const [filtersSelected, setFiltersSelected] = useState<Filter[]>(convertSearchParamsToFilters());
  const [page, setPage] = useState<number>(getPageFromSearchParams());
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    if (!connected) {
      setFiltersSelected(filtersSelected.filter(filter => filter.category !== FilterCategory.createdBy));
    }
  }, [connected]);

  useEffect(() => {
    setTotalCount(0);
    const newQuery = searchParams.get("query");
    if (newQuery && query !== newQuery) {
      setQuery(newQuery);
      setFiltersSelected([]);
      setPage(1);
    }
  }, [searchParams.get("query")]);

  useEffect(() => {
    setSearchParams({ query, ...convertFiltersToSearchParams(filtersSelected), page: String(page) });
  }, [query, filtersSelected, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, query]);

  const searchPageContextValue = useMemo(
    () => ({ query, setQuery, filtersSelected, setFiltersSelected, page, setPage, totalCount, setTotalCount }),
    [query, setQuery, filtersSelected, setFiltersSelected, page, setPage, totalCount, setTotalCount],
  );

  return <SearchPageContext.Provider value={searchPageContextValue}>{children}</SearchPageContext.Provider>;
};

export default SearchPageContextProvider;
