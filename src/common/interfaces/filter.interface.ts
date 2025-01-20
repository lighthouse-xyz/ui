import { FilterCategory } from "../enums/filter-category.enum";

export interface Filter {
  option: string;
  category: FilterCategory;
}
