import React from "react";

import FilterDropdownMenusWithChips from "../filter-dropdown-menus-with-chips/filter-dropdown-menus-with-chips.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { When } from "@src/common/enums/when.enum";
import { EventSortingMethod, RelationshipToOwner, World } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FilterList } from "@src/common/interfaces/filter-list.interface";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useRecommendedEventsPageContext } from "@src/context/recommended-events-page/recommended-events-page-context";
import { useVrContext } from "@src/context/vr/vr-context";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { excludedWorlds, excludedWorldsInVr } from "@src/utils/worlds.util";

const RecommendedEventsFilters: React.FC = () => {
  const { getMenuOptionArrayFromEnum } = useEnum();

  const { vrMode } = useVrContext();
  const { filtersSelected, setFiltersSelected, sortingMethod, setSortingMethod, setPage } =
    useRecommendedEventsPageContext();
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
      category: FilterCategory.when,
      filterOptions: getMenuOptionArrayFromEnum(When, FilterCategory.when),
      maxSelected: 1,
    },
    {
      category: FilterCategory.eventSortBy,
      filterOptions: getMenuOptionArrayFromEnum(EventSortingMethod, FilterCategory.eventSortBy, [
        EventSortingMethod.nextFinishAtAsc,
        EventSortingMethod.nextFinishAtDesc,
        EventSortingMethod.nextStartAtDesc,
      ]),
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

export default RecommendedEventsFilters;
