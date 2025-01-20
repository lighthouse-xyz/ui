import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useAuthContext } from "../auth/auth-context";
import { RecommendedPlacesPageContext } from "./recommended-places-page-context";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { PlaceSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { PropsWithChildren } from "@src/common/interfaces/props-with-children.interface";
import useSearchParamsValidation from "@src/hooks/utils/use-search-params-validation.hook";

interface PlacesStateFromLocation {
  filters?: Filter[];
  sort?: PlaceSortingMethod;
}

const RecommendedPlacesPageContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { connected } = useAuthContext();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    convertFiltersToSearchParams,
    convertSearchParamsToFilters,
    getPlacesSortFromSearchParams,
    getPageFromSearchParams,
  } = useSearchParamsValidation(searchParams);

  const state = location.state as PlacesStateFromLocation | undefined;

  const [filtersSelected, setFiltersSelected] = useState<Filter[]>(state?.filters || convertSearchParamsToFilters());
  const [page, setPage] = useState<number>(getPageFromSearchParams());

  const [sortingMethod, setSortingMethod] = useState<PlaceSortingMethod>(
    state?.sort || getPlacesSortFromSearchParams(),
  );

  useEffect(() => {
    if (!connected) {
      setFiltersSelected(filtersSelected.filter(filter => filter.category !== FilterCategory.createdBy));
    }
  }, [connected]);

  useEffect(() => {
    setSearchParams({
      ...convertFiltersToSearchParams(filtersSelected),
      sort: sortingMethod,
      page: String(page),
    });
  }, [filtersSelected, sortingMethod, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const pageContextValue = useMemo(
    () => ({ filtersSelected, setFiltersSelected, sortingMethod, setSortingMethod, page, setPage }),
    [filtersSelected, setFiltersSelected, sortingMethod, setSortingMethod, page, setPage],
  );

  return (
    <RecommendedPlacesPageContext.Provider value={pageContextValue}>{children}</RecommendedPlacesPageContext.Provider>
  );
};

export default RecommendedPlacesPageContextProvider;
