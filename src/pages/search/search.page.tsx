import React from "react";
import { Trans } from "react-i18next";

import { Query } from "./search.style";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import SearchFilters from "@src/components/entities/search-filters/search-filters.component";
import SearchResultsList from "@src/components/entities/search-results-list/search-results-list.component";
import { useSearchPageContext } from "@src/context/search-page/search-page-context";

const Search: React.FC = () => {
  const { totalCount, query } = useSearchPageContext();

  return (
    <>
      <Typography variant="h5" marginBottom={entitiesResultLayout.titleContentGap} textAlign="center">
        <Trans
          i18nKey="search.searchResultsFor"
          values={{ query, nbResults: totalCount && totalCount > 0 ? `(${totalCount})` : "" }}
          components={{
            query: <Query />,
          }}
        />
      </Typography>
      <Stack spacing={entitiesResultLayout.filtersCardsGap}>
        <SearchFilters />
        <SearchResultsList />
      </Stack>
    </>
  );
};

export default Search;
