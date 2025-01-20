import React from "react";

import Stack from "@mui/material/Stack";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import FeaturedCarousel from "@src/components/entities/featured-carousel/featured-carousel.component";
import RecommendedEventsFilters from "@src/components/entities/recommended-events-filters/recommended-events-filters.component";
import RecommendedEventsResultsList from "@src/components/entities/recommended-events-results-list/recommended-events-results-list.component";

const RecommendedEvents: React.FC = () => {
  return (
    <Stack spacing={entitiesResultLayout.filtersCardsGap}>
      <FeaturedCarousel entityType={EntityType.event} />
      <RecommendedEventsFilters />
      <RecommendedEventsResultsList />
    </Stack>
  );
};

export default RecommendedEvents;
