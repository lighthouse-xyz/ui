import React, { useEffect } from "react";

import ResultsList from "../results-list/results-list.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import {
  EntityType,
  RelationshipToOwner,
  SearchFilteringArgs,
  World,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import { useSearchPageContext } from "@src/context/search-page/search-page-context";
import useSearchEntities from "@src/hooks/discovery/use-search-entities.hook";
import groupBy from "lodash.groupby";

const SearchResultsList: React.FC = () => {
  const { query, filtersSelected, setTotalCount, page, setPage } = useSearchPageContext();

  const getFilteringArgs = (): SearchFilteringArgs => {
    const filteringArgs: { [key in FilterCategory]?: Filter[] } = groupBy(filtersSelected, "category");

    return {
      worlds: filteringArgs[FilterCategory.world]?.map(f => f.option as World),
      types: filteringArgs[FilterCategory.type]?.map(f => f.option as EntityType),
      relationshipToOwner: filteringArgs[FilterCategory.createdBy]?.map(f => f.option as RelationshipToOwner),
    };
  };

  const { searchEntities, results } = useSearchEntities(
    query ?? "",
    entitiesResultLayout.itemsPerPage,
    (page - 1) * entitiesResultLayout.itemsPerPage,
    filtersSelected.length !== 0
      ? getFilteringArgs()
      : { types: [EntityType.estate, EntityType.event, EntityType.member, EntityType.parcel] },
  );

  useEffect(() => {
    if (query && query !== "") {
      void searchEntities();
    }
  }, [query]);

  useEffect(() => {
    if (results.data && setTotalCount) {
      setTotalCount(results.data.entities.totalCount || null);
    }
  }, [results.data]);

  return <ResultsList results={results} page={page} setPage={setPage} tagDisplayed />;
};

export default SearchResultsList;
