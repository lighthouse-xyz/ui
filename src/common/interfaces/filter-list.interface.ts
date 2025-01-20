import { FilterCategory } from "../enums/filter-category.enum";
import { MenuOption } from "./menu-option.interface";

export interface FilterList {
  category: FilterCategory;
  filterOptions: MenuOption[];
  defaultOption?: string;
  maxSelected?: number;
}
