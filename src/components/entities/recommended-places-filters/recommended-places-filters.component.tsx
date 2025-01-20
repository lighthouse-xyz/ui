import React from "react";

import FilterDropdownMenusWithChips from "../filter-dropdown-menus-with-chips/filter-dropdown-menus-with-chips.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { PlaceSortingMethod, RelationshipToOwner, World } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FilterList } from "@src/common/interfaces/filter-list.interface";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useRecommendedPlacesPageContext } from "@src/context/recommended-places-page/recommended-places-page-context";
import { useVrContext } from "@src/context/vr/vr-context";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { excludedWorlds, excludedWorldsInVr } from "@src/utils/worlds.util";

const RecommendedPlacesFilters: React.FC = () => {
  const { getMenuOptionArrayFromEnum } = useEnum();

  const { vrMode } = useVrContext();
  const { filtersSelected, setFiltersSelected, sortingMethod, setSortingMethod, setPage } =
    useRecommendedPlacesPageContext();
  const { connected } = useAuthContext();

  const listFilters: FilterList[] = [
    {
      category: FilterCategory.world,
      filterOptions: getMenuOptionArrayFromEnum(
        World,
        FilterCategory.world,
        vrMode ? excludedWorldsInVr : excludedWorlds,
      ),
    },
    ...conditionalItem(connected, {
      category: FilterCategory.createdBy,
      filterOptions: getMenuOptionArrayFromEnum(RelationshipToOwner, FilterCategory.createdBy),
    }),
    {
      category: FilterCategory.placeSortBy,
      filterOptions: getMenuOptionArrayFromEnum(PlaceSortingMethod, FilterCategory.placeSortBy),
      defaultOption: sortingMethod,
    },
  ];

  return (
    <FilterDropdownMenusWithChips
      listFilters={listFilters}
      filtersSelected={filtersSelected}
      setFiltersSelected={setFiltersSelected}
      setSortingMethod={setSortingMethod}
      setPage={setPage}
    />
  );
};

export default RecommendedPlacesFilters;
