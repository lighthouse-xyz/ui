import React from "react";
import { useTranslation } from "react-i18next";

import useGetPins from "../../../hooks/user/use-get-pins.hook";
import EntityCardCarousel from "../../entities/entity-card-carousel/entity-card-carousel.component";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";

interface Props {
  userId: string;
  isCurrentUser: boolean;
}

const ProfilePins: React.FC<Props> = ({ userId, isCurrentUser }) => {
  const { t } = useTranslation();

  const results = useGetPins(entitiesResultLayout.itemsPerPage, 0, userId);

  return (
    <>
      {!!results.data && results.data.entities.totalCount > 0 && (
        <EntityCardCarousel
          clickOrigin={TouchOrigin.pinnedCarousel}
          title={t("pins.label")}
          entitiesResults={results}
          enableLoadingState={false}
          infiniteScroll
        />
      )}
      {isCurrentUser && results.data?.entities.totalCount === 0 && (
        <NoResultsFound
          title={t("noResults.pins.title")}
          subtitle={t("noResults.pins.subtitle")}
          size="small"
          marginTop="0"
        />
      )}
    </>
  );
};

export default ProfilePins;
