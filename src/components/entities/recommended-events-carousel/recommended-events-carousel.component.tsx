import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import EntityCardCarousel from "../entity-card-carousel/entity-card-carousel.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { When } from "@src/common/enums/when.enum";
import {
  EntityType,
  EventSortingMethod,
  RelationshipToOwner,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import paths from "@src/common/paths";
import { useGetRecommendations } from "@src/hooks/discovery/use-get-recommendations.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { convertWhenToFilteringArgs } from "@src/utils/grouped-events.util";

interface Props {
  title: string;
  origin: TouchOrigin;
  sort?: EventSortingMethod;
  when?: When;
  relationshipToOwner?: RelationshipToOwner;
}

const RecommendedEventsCarousel: React.FC<Props> = ({
  title,
  origin,
  sort = EventSortingMethod.mostPopular,
  when,
  relationshipToOwner,
}) => {
  const topEvents = 10;

  const navigate = useNavigate();

  const [now] = useState(new Date().toISOString());

  const results = useGetRecommendations({
    type: EntityType.event,
    variables: {
      first: topEvents,
      offset: 0,
      sort,
      where: {
        nextFinishAt: { greaterThanOrEqual: now },
        ...(when ? convertWhenToFilteringArgs(now, when) : {}),
        ...(relationshipToOwner ? { relationshipToOwner: [relationshipToOwner] } : {}),
      },
    },
  });
  const hasEvents = !!results.data && results.data.entities.totalCount > 0;

  const handleViewAllEvents = (): void => {
    navigate(paths.events, {
      state: {
        sort,
        filters: [
          ...conditionalItem(!!when, { option: when, category: FilterCategory.when }),
          ...conditionalItem(!!relationshipToOwner, {
            option: relationshipToOwner,
            category: FilterCategory.createdBy,
          }),
        ],
      },
    });
  };

  return hasEvents || results.loading ? (
    <EntityCardCarousel
      clickOrigin={origin}
      title={title}
      entitiesResults={results}
      handleViewAll={handleViewAllEvents}
    />
  ) : null;
};

export default RecommendedEventsCarousel;
