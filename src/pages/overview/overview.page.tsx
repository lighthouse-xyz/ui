import React from "react";
import { useTranslation } from "react-i18next";

import Stack from "@mui/material/Stack";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import {
  EventSortingMethod,
  PlaceSortingMethod,
  RelationshipToOwner,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import FeaturedCarousel from "@src/components/entities/featured-carousel/featured-carousel.component";
import InterestedEventsCarousel from "@src/components/entities/interested-events-carousel/interested-events-carousel";
import RecommendedEventsCarousel from "@src/components/entities/recommended-events-carousel/recommended-events-carousel.component";
import RecommendedPlacesCarousel from "@src/components/entities/recommended-places-carousel/recommended-places-carousel.component";
import ExtensionBanner from "@src/components/layout/extension-banner/extension-banner.component";
import { useAuthContext } from "@src/context/auth/auth-context";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  const { connected, profile } = useAuthContext();

  return (
    <Stack>
      <ExtensionBanner />

      <Stack spacing={9}>
        <FeaturedCarousel entityType="all" />

        {!!profile && <InterestedEventsCarousel userId={profile.userId} />}

        <RecommendedEventsCarousel title={t("events.trendingEvents")} origin={TouchOrigin.trendingCarousel} />
        <RecommendedPlacesCarousel title={t("places.trendingPlaces")} origin={TouchOrigin.trendingCarousel} />

        {connected && (
          <>
            <RecommendedEventsCarousel
              title={t("events.fromYourFavoriteCreators")}
              origin={TouchOrigin.fromFavoriteCreatorsCarousel}
              sort={EventSortingMethod.createdAt}
              relationshipToOwner={RelationshipToOwner.following}
            />
            <RecommendedPlacesCarousel
              title={t("places.fromYourFavoriteCreators")}
              origin={TouchOrigin.fromFavoriteCreatorsCarousel}
              sort={PlaceSortingMethod.createdAt}
              relationshipToOwner={RelationshipToOwner.following}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Overview;
