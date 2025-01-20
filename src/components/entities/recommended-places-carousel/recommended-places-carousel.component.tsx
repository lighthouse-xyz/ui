import React from "react";
import { useNavigate } from "react-router-dom";

import EntityCardCarousel from "../entity-card-carousel/entity-card-carousel.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import {
  EntityType,
  PlaceSortingMethod,
  RelationshipToOwner,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import paths from "@src/common/paths";
import { useGetRecommendations } from "@src/hooks/discovery/use-get-recommendations.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";

interface Props {
  title: string;
  origin: TouchOrigin;
  sort?: PlaceSortingMethod;
  relationshipToOwner?: RelationshipToOwner;
}

const RecommendedPlacesCarousel: React.FC<Props> = ({
  title,
  origin,
  sort = PlaceSortingMethod.mostPopular,
  relationshipToOwner,
}) => {
  const topPlaces = 10;

  const navigate = useNavigate();

  const results = useGetRecommendations({
    type: EntityType.parcel,
    variables: {
      first: topPlaces,
      offset: 0,
      sort,
      where: {
        ...(relationshipToOwner ? { relationshipToOwner: [relationshipToOwner] } : {}),
      },
    },
  });
  const hasPlaces = !!results.data && results.data.entities.totalCount > 0;

  const handleViewAllPlaces = (): void => {
    navigate(paths.places, {
      state: {
        sort,
        filters: [
          ...conditionalItem(!!relationshipToOwner, {
            option: relationshipToOwner,
            category: FilterCategory.createdBy,
          }),
        ],
      },
    });
  };

  return hasPlaces || results.loading ? (
    <EntityCardCarousel
      clickOrigin={origin}
      title={title}
      entitiesResults={results}
      handleViewAll={handleViewAllPlaces}
    />
  ) : null;
};

export default RecommendedPlacesCarousel;
