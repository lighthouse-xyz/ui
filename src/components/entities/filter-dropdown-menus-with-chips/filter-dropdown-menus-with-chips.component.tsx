import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { FilterButton, FilterCount, StackStyled } from "./filter-dropdown-menus-with-chips.style";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as FilterIcon } from "@src/assets/icons/filter-icon.svg";
import { FilterCategory, isSortByFilter } from "@src/common/enums/filter-category.enum";
import { EventSortingMethod, PlaceSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { FilterList } from "@src/common/interfaces/filter-list.interface";
import ChipList from "@src/components/common/chip-list/chip-list.component";
import DropdownMenu, { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import { useEnum } from "@src/hooks/utils/use-enum.hook";
import { resources } from "@src/locales/i18n";
import getTitleCase from "@src/utils/convert-camel-case-to-title-case.util";

type SortingMethod = EventSortingMethod | PlaceSortingMethod;

interface Props<SortingMethodEnum> {
  listFilters: FilterList[];
  filtersSelected: Filter[];
  setFiltersSelected: (filters: Filter[]) => void;
  setSortingMethod?: (sortingMethod: SortingMethodEnum) => void;
  setPage?: (page: number) => void;
}

const FilterDropdownMenusWithChips = <SortingMethodEnum extends SortingMethod>({
  listFilters,
  filtersSelected,
  setFiltersSelected,
  setSortingMethod,
  setPage,
}: Props<SortingMethodEnum>): JSX.Element => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { getEnumValueLabel } = useEnum();

  const [showFilters, setShowFilters] = useState(filtersSelected.length > 0);

  const getCategoryLabel = (category: FilterCategory): string => {
    return t(`enum.filterCategory.${category as keyof typeof resources.en.common.enum.filterCategory}`, {
      defaultValue: getTitleCase(category),
    });
  };

  const getFilterChipLabel = (filter: Filter): string => {
    const enumKey = isSortByFilter(filter.category)
      ? "sort"
      : (filter.category as keyof typeof resources.en.common.enum);

    return `${getEnumValueLabel(filter.category, "filterCategory")}: ${getEnumValueLabel(filter.option, enumKey)}`;
  };

  const handleOptionClick = (option: string, category: FilterCategory): void => {
    if (isSortByFilter(category) && setSortingMethod) {
      setSortingMethod(option as SortingMethodEnum);
    } else {
      setFiltersSelected([...filtersSelected, { category, option }]);
    }
    setPage && setPage(1);
  };

  const handleDelete = (filterToDelete: string): void => {
    setFiltersSelected(filtersSelected.filter(filter => getFilterChipLabel(filter) !== filterToDelete));
    setPage && setPage(1);
  };

  const handleClearAll = (): void => {
    setFiltersSelected([]);
    setPage && setPage(1);
  };

  const isOptionDisabled = (option: string, category?: FilterCategory, maxSelected?: number): boolean => {
    const optionAlreadySelected = filtersSelected.findIndex(filter => filter.option === option) !== -1;
    const nbOptionsSelectedWithSameCategory = filtersSelected.filter(filter => filter.category === category).length;
    return optionAlreadySelected || (!!maxSelected && nbOptionsSelectedWithSameCategory === maxSelected);
  };

  const sortByFilter: FilterList | undefined = listFilters?.find(filter => isSortByFilter(filter.category));

  const filtersWithoutSortBy: FilterList[] = listFilters.filter(filter => !isSortByFilter(filter.category));

  return listFilters.length > 0 ? (
    <Stack>
      <StackStyled direction="row" spacing={2} justifyContent="space-between">
        <FilterButton
          variant={filtersSelected.length > 0 ? "contained" : "outlined"}
          color="inherit"
          startIcon={
            filtersSelected.length > 0 ? (
              <FilterCount label={filtersSelected.length} />
            ) : (
              <Box paddingTop="5px" paddingLeft="2px">
                <FilterIcon color={palette.action.active} width="22px" height="22px" />
              </Box>
            )
          }
          starticonmarginleft={filtersSelected.length > 0 ? "2px" : undefined}
          onClick={() => setShowFilters(!showFilters)}>
          {t("cta.filters")}
        </FilterButton>
        {!!sortByFilter && (
          <DropdownMenu
            key={`sort-by-filter-dropdown-${sortByFilter.category}`}
            menuOptions={sortByFilter.filterOptions}
            category={sortByFilter.category}
            buttonProps={{
              type: ButtonType.text,
              label: getCategoryLabel(sortByFilter.category),
              isOptionDisplayedAsBtnLabel: true,
              muiButtonProps: { variant: "outlined", color: "inherit" },
            }}
            defaultOption={sortByFilter.defaultOption}
            onOptionClick={handleOptionClick}
          />
        )}
      </StackStyled>

      <Collapse in={showFilters}>
        <Stack spacing={4} marginTop={4}>
          <StackStyled direction="row" spacing={2}>
            {filtersWithoutSortBy.map(filterDropdownMenu => (
              <DropdownMenu
                key={`filter-dropdown-${filterDropdownMenu.category}`}
                menuOptions={filterDropdownMenu.filterOptions}
                category={filterDropdownMenu.category}
                buttonProps={{
                  type: ButtonType.text,
                  label: getCategoryLabel(filterDropdownMenu.category),
                  muiButtonProps: { variant: "outlined", color: "inherit" },
                }}
                onOptionClick={handleOptionClick}
                isOptionDisabled={option =>
                  isOptionDisabled(option, filterDropdownMenu.category, filterDropdownMenu.maxSelected)
                }
              />
            ))}
          </StackStyled>
          <ChipList
            chips={filtersSelected.map(filter => getFilterChipLabel(filter))}
            gap={{ row: 1, column: 2 }}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
          />
        </Stack>
      </Collapse>
    </Stack>
  ) : (
    <></>
  );
};

export default FilterDropdownMenusWithChips;
