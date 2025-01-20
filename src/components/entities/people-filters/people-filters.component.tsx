import React from "react";

import FilterDropdownMenusWithChips from "../filter-dropdown-menus-with-chips/filter-dropdown-menus-with-chips.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { UserCategory } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FilterList } from "@src/common/interfaces/filter-list.interface";
import { usePeoplePageContext } from "@src/context/people-page/people-page-context";
import { useEnum } from "@src/hooks/utils/use-enum.hook";

const PeopleFilters: React.FC = () => {
  const { getMenuOptionArrayFromEnum } = useEnum();

  const { filtersSelected, setFiltersSelected, setPage } = usePeoplePageContext();

  const listFilters: FilterList[] = [
    {
      category: FilterCategory.userCategory,
      filterOptions: getMenuOptionArrayFromEnum(UserCategory, FilterCategory.userCategory),
    },
  ];

  return (
    <FilterDropdownMenusWithChips
      listFilters={listFilters}
      filtersSelected={filtersSelected}
      setFiltersSelected={setFiltersSelected}
      setPage={setPage}
    />
  );
};

export default PeopleFilters;
