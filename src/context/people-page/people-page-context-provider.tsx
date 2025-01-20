import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { PeoplePageContext } from "./people-page-context";
import { Filter } from "@src/common/interfaces/filter.interface";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import useSearchParamsValidation from "@src/hooks/utils/use-search-params-validation.hook";

interface PeopleStateFromLocation {
  filters?: Filter[];
}

const PeoplePageContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { convertFiltersToSearchParams, convertSearchParamsToFilters, getPageFromSearchParams } =
    useSearchParamsValidation(searchParams);

  const state = location.state as PeopleStateFromLocation | undefined;

  const [filtersSelected, setFiltersSelected] = useState<Filter[]>(state?.filters || convertSearchParamsToFilters());
  const [page, setPage] = useState<number>(getPageFromSearchParams());

  useEffect(() => {
    setSearchParams({ ...convertFiltersToSearchParams(filtersSelected), page: String(page) });
  }, [filtersSelected, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const peoplePageContextValue = useMemo(
    () => ({ filtersSelected, setFiltersSelected, page, setPage }),
    [filtersSelected, setFiltersSelected, page, setPage],
  );

  return <PeoplePageContext.Provider value={peoplePageContextValue}>{children}</PeoplePageContext.Provider>;
};

export default PeoplePageContextProvider;
