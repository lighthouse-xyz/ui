import React from "react";

import Stack from "@mui/material/Stack";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import FeaturedCarousel from "@src/components/entities/featured-carousel/featured-carousel.component";
import RecommendedPlacesFilters from "@src/components/entities/recommended-places-filters/recommended-places-filters.component";
import RecommendedPlacesResultsList from "@src/components/entities/recommended-places-results-list/recommended-places-results-list.component";

const RecommendedPlaces: React.FC = () => {
  return (
    <Stack spacing={entitiesResultLayout.filtersCardsGap}>
      <FeaturedCarousel entityType={EntityType.parcel} />
      <RecommendedPlacesFilters />
      <RecommendedPlacesResultsList />
    </Stack>
  );
};

export default RecommendedPlaces;
