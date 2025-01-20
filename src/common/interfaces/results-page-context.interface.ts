import { EventSortingMethod, PlaceSortingMethod } from "../graphql/generated/discovery.schema.graphql";
import { Filter } from "./filter.interface";

export type NoSortingMethod = void;
type SortingMethod = EventSortingMethod | PlaceSortingMethod | NoSortingMethod;

export interface ResultsPageContextInterface<SortingMethodEnum extends SortingMethod = NoSortingMethod> {
  filtersSelected: Filter[];
  setFiltersSelected: (filters: Filter[]) => void;
  sortingMethod?: SortingMethodEnum;
  setSortingMethod?: (sortingMethod: SortingMethodEnum) => void;
  page: number;
  setPage: (page: number) => void;
  query?: string;
  setQuery?: (_query: string) => void;
  totalCount?: number | null;
  setTotalCount?: (count: number | null) => void;
}
