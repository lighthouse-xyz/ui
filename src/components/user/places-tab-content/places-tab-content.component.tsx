import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { PlaceSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import paths from "@src/common/paths";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import ResultsList from "@src/components/entities/results-list/results-list.component";
import { useGetPlaces } from "@src/hooks/discovery/use-get-places.hook";

interface Props {
  isCurrentUser: boolean;
  userId: string;
}

const PlacesTabContent: React.FC<Props> = ({ isCurrentUser, userId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const results = useGetPlaces({
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    sort: PlaceSortingMethod.nameAsc,
    where: { ownerUser: userId },
  });

  const getEditButton = (): JSX.Element => {
    return (
      <Button variant="outlined" onClick={() => navigate(paths.yourPlaces)}>
        {t("places.edit")}
      </Button>
    );
  };

  return (
    <Stack position="relative">
      {!!results.data?.entities.list && results.data.entities.totalCount > 0 && (
        <>
          <Typography variant="h5" marginBottom={entitiesResultLayout.titleContentGap}>
            {t("cta.jumpIn")}
          </Typography>
          {isCurrentUser && (
            <Box alignSelf="flex-end" position="absolute">
              {getEditButton()}
            </Box>
          )}
        </>
      )}
      <ResultsList
        results={results}
        infiniteScroll={{ enabled: true }}
        noResultsIndicator={
          <NoResultsFound
            title={
              isCurrentUser ? t("noResults.placesTab.title.currentUser") : t("noResults.placesTab.title.otherUser")
            }
            subtitle={isCurrentUser ? t("noResults.placesTab.subtitle") : undefined}
            size="small"
            button={isCurrentUser ? getEditButton() : undefined}
          />
        }
      />
    </Stack>
  );
};

export default PlacesTabContent;
