import React from "react";

import ResultsList from "../results-list/results-list.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { MembersFilteringArgs, UserCategory } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import { usePeoplePageContext } from "@src/context/people-page/people-page-context";
import useGetMembers from "@src/hooks/discovery/use-get-members.hook";
import groupBy from "lodash.groupby";

type FilteringArgsKey = keyof Omit<MembersFilteringArgs, "attendingMvfw">;

const PeopleResultsList: React.FC = () => {
  const { page, setPage, filtersSelected } = usePeoplePageContext();

  const getFilteringArgs = (): MembersFilteringArgs => {
    const filtersGrouped: { [key in FilterCategory]?: Filter[] } = groupBy(filtersSelected, "category");

    const filteringArgs = {
      categories: filtersGrouped[FilterCategory.userCategory]?.map(f => f.option as UserCategory),
    };
    Object.keys(filteringArgs).forEach(key => {
      if (filteringArgs[key as FilteringArgsKey] === undefined) {
        delete filteringArgs[key as FilteringArgsKey];
      }
    });

    return filteringArgs;
  };

  const results = useGetMembers({
    first: entitiesResultLayout.itemsPerPage,
    offset: (page - 1) * entitiesResultLayout.itemsPerPage,
    where: filtersSelected.length > 0 ? getFilteringArgs() : undefined,
  });

  return <ResultsList results={results} page={page} setPage={setPage} />;
};

export default PeopleResultsList;
