export enum FilterCategory {
  createdBy = "createdBy",
  eventSortBy = "eventSortBy",
  none = "none",
  peopleSortBy = "peopleSortBy",
  placeSortBy = "placeSortBy",
  type = "type",
  userCategory = "userCategory",
  when = "when",
  world = "world",
}

export const sortByFilters = [FilterCategory.eventSortBy, FilterCategory.placeSortBy, FilterCategory.peopleSortBy];

export const isSortByFilter = (category: FilterCategory): boolean => sortByFilters.includes(category);
