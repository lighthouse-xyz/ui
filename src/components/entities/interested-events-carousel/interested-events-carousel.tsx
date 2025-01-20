import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import EntityCardCarousel from "../entity-card-carousel/entity-card-carousel.component";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { When } from "@src/common/enums/when.enum";
import { InterestedSortingMethod } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import useGetInterestedEvents from "@src/hooks/user/use-get-interested-events.hook";
import { convertWhenToFilteringArgs } from "@src/utils/grouped-events.util";

interface Props {
  userId: string;
}

const InterestedEventsCarousel: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [now] = useState(new Date().toISOString());

  const results = useGetInterestedEvents({
    id: userId,
    first: entitiesResultLayout.itemsPerPage,
    offset: 0,
    sort: InterestedSortingMethod.nextStartAtAsc,
    where: convertWhenToFilteringArgs(now, When.live),
  });
  const userHasLiveEvents = !!results.data && results.data.entities.totalCount > 0;

  const handleViewAllEvents = (): void => {
    navigate(paths.interested);
  };

  return userHasLiveEvents || results.loading ? (
    <EntityCardCarousel
      clickOrigin={TouchOrigin.liveEventsCarousel}
      title={t("events.yourEvents.yourLiveEvents")}
      entitiesResults={results}
      infiniteScroll
      handleViewAll={handleViewAllEvents}
    />
  ) : null;
};

export default InterestedEventsCarousel;
