import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { When } from "@src/common/enums/when.enum";
import {
  EntityType,
  EventSortingMethod,
  PlaceSortingMethod,
  RelationshipToOwner,
  UserCategory,
  World,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { useAuthContext } from "@src/context/auth/auth-context";
import { SettingsTab } from "@src/pages/settings/settings.page";
import groupBy from "lodash.groupby";

enum SearchParamsFilterCategory {
  createdBy = "createdBy",
  types = "types",
  userCategory = "userCategory",
  when = "when",
  worlds = "worlds",
}

type Enum = typeof World | typeof EntityType | typeof RelationshipToOwner | typeof UserCategory | typeof When;

const mapSearchParamsCategory: { [key in SearchParamsFilterCategory]: { filterCategory: FilterCategory; enum: Enum } } =
  {
    [SearchParamsFilterCategory.createdBy]: { filterCategory: FilterCategory.createdBy, enum: RelationshipToOwner },
    [SearchParamsFilterCategory.types]: { filterCategory: FilterCategory.type, enum: EntityType },
    [SearchParamsFilterCategory.userCategory]: { filterCategory: FilterCategory.userCategory, enum: UserCategory },
    [SearchParamsFilterCategory.when]: { filterCategory: FilterCategory.when, enum: When },
    [SearchParamsFilterCategory.worlds]: { filterCategory: FilterCategory.world, enum: World },
  };

interface SearchParamsUtils {
  convertFiltersToSearchParams: (filters: Filter[]) => { [key in SearchParamsFilterCategory]?: string };
  convertSearchParamsToFilters: () => Filter[];
  getPageFromSearchParams: () => number;
  getPlacesSortFromSearchParams: () => PlaceSortingMethod;
  getEventsSortFromSearchParams: () => EventSortingMethod;
  getSettingsTabFromSearchParams: () => SettingsTab;
}

function useSearchParamsValidation(searchParams: URLSearchParams): SearchParamsUtils {
  const { connected, loading } = useAuthContext();
  const notConnected = !loading && !connected;

  const convertFiltersToSearchParams = (filters: Filter[]): { [key in SearchParamsFilterCategory]?: string } => {
    const filtersGroupByCategory: { [key in FilterCategory]?: Filter[] } = groupBy(filters, "category");

    const newSearchParams: { [key in SearchParamsFilterCategory]?: string } = {};
    Object.entries(filtersGroupByCategory).forEach(([category, filtersList]) => {
      const searchParamsKey = Object.keys(mapSearchParamsCategory).find(
        key => mapSearchParamsCategory[key as SearchParamsFilterCategory].filterCategory === category,
      );
      if (filtersList.length) {
        newSearchParams[searchParamsKey as SearchParamsFilterCategory] = filtersList.map(f => f.option).toString();
      }
    });

    return newSearchParams;
  };

  const convertSearchParamsToFilters = (): Filter[] => {
    const filters: Filter[] = [];
    Object.values(SearchParamsFilterCategory).forEach(category => {
      const validOptions = Object.values(mapSearchParamsCategory[category].enum);
      const optionsSelected = searchParams.get(category)?.split(",");

      optionsSelected?.forEach(option => {
        if (validOptions.includes(option) && !(notConnected && category === SearchParamsFilterCategory.createdBy)) {
          filters.push({ option, category: mapSearchParamsCategory[category].filterCategory });
        }
      });
    });

    return filters;
  };

  const getPageFromSearchParams = (): number => {
    const page = Number(searchParams.get("page")) || 1;
    return page < 1 ? 1 : page;
  };

  const getEventsSortFromSearchParams = (): EventSortingMethod => {
    const defaultSort = EventSortingMethod.mostPopular;
    const sort = (searchParams.get("sort") as EventSortingMethod) || defaultSort;
    const isValidSort = Object.keys(EventSortingMethod).includes(sort);
    if (isValidSort) {
      return sort;
    }

    return defaultSort;
  };

  const getPlacesSortFromSearchParams = (): PlaceSortingMethod => {
    const defaultSort = PlaceSortingMethod.mostPopular;
    const sort = (searchParams.get("sort") as PlaceSortingMethod) || defaultSort;
    const isValidSort = Object.keys(PlaceSortingMethod).includes(sort);
    if (isValidSort) {
      return sort;
    }

    return defaultSort;
  };

  const getSettingsTabFromSearchParams = (): SettingsTab => {
    const tab = (searchParams.get("tab") as SettingsTab) || SettingsTab.account;
    const validOptions = Object.keys(SettingsTab);
    if (validOptions.includes(tab)) {
      return tab;
    }

    return SettingsTab.account;
  };

  return {
    convertFiltersToSearchParams,
    convertSearchParamsToFilters,
    getPageFromSearchParams,
    getPlacesSortFromSearchParams,
    getEventsSortFromSearchParams,
    getSettingsTabFromSearchParams,
  };
}

export default useSearchParamsValidation;
