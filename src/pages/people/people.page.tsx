import React from "react";

import Stack from "@mui/material/Stack";
import { EntityType } from "@src/common/graphql/generated/user.schema.graphql";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import FeaturedCarousel from "@src/components/entities/featured-carousel/featured-carousel.component";
import PeopleFilters from "@src/components/entities/people-filters/people-filters.component";
import PeopleResultsList from "@src/components/entities/people-results-list/people-results-list.component";

const People: React.FC = () => {
  return (
    <Stack spacing={entitiesResultLayout.filtersCardsGap}>
      <FeaturedCarousel entityType={EntityType.member} />
      <PeopleFilters />
      <PeopleResultsList />
    </Stack>
  );
};

export default People;
