import React from "react";
import { useTranslation } from "react-i18next";

import EntityCardCarousel from "../entity-card-carousel/entity-card-carousel.component";
import { CardSize } from "@src/common/enums/card-size.enum";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { FeaturedEntityType } from "@src/common/interfaces/featured-entity-type.type";
import { useVrContext } from "@src/context/vr/vr-context";
import { useGetFeatured } from "@src/hooks/discovery/use-get-featured.hook";

interface Props {
  entityType: FeaturedEntityType;
}

const FeaturedCarousel: React.FC<Props> = ({ entityType }) => {
  const { t } = useTranslation();

  const { vrMode } = useVrContext();

  const results = useGetFeatured(entityType, vrMode);
  const hasEntities = !!results.data && results.data.entities.totalCount > 0;

  return hasEntities || results.loading ? (
    <EntityCardCarousel
      clickOrigin={TouchOrigin.featuredCarousel}
      title={t("home.featured")}
      entitiesResults={results}
      cardSize={CardSize.largeSquare}
    />
  ) : null;
};

export default FeaturedCarousel;
