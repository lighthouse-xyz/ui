import React, { useEffect, useId, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useTranslation } from "react-i18next";

import EntityCardSkeleton from "../entity-card-skeleton/entity-card-skeleton.component";
import EntityCard from "../entity-content/entity-card/entity-card.component";
import ViewAllCard from "../view-all-card/view-all-card.component";
import { ScrollMenuContainer } from "./entity-card-carousel.style";
import LeftArrowButton from "./left-arrow-button/left-arrow-button.component";
import RightArrowButton from "./right-arrow-button/right-arrow-button.component";
import { NetworkStatus } from "@apollo/client";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardSize } from "@src/common/enums/card-size.enum";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { Entity } from "@src/common/interfaces/entity.type";
import { QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";
import useFetchMore from "@src/hooks/utils/use-fetch-more.hook";

interface Props {
  clickOrigin: TouchOrigin;
  entitiesResults: QueryEntitiesResults;
  title: string | JSX.Element;
  // Set enableLoadingState = false for interactive list where there will be no skeletons or view all
  // otherwise deleting or removing doesn't properly update items from react-horizontal-scrolling-menu
  enableLoadingState?: boolean;
  cardSize?: CardSize;
  handleViewAll?: () => void;
  infiniteScroll?: boolean;
}

const EntityCardCarousel: React.FC<Props> = ({
  clickOrigin,
  entitiesResults: { data, networkStatus, fetchMore },
  title,
  enableLoadingState = true,
  cardSize = CardSize.small,
  handleViewAll,
  infiniteScroll = false,
}) => {
  const id = useId();
  const skeleton = "skeleton";
  const viewAll = "viewAll";
  const loadingSkeletons: (typeof skeleton)[] = [skeleton, skeleton, skeleton, skeleton, skeleton];

  type Slide = Entity | typeof viewAll | typeof skeleton;

  const { t } = useTranslation();
  const { fetchMoreItems } = useFetchMore(fetchMore);

  const [slides, setSlides] = useState<Slide[]>(loadingSkeletons);
  const [totalCount, setTotalCount] = useState(0);

  const entities = data?.entities.list;
  const entitiesTotalCount: number = data?.entities.totalCount ?? 0;
  const entitiesReady = !!entities && entities.length > 0;

  useEffect(() => {
    if (entitiesReady) {
      const newSlides: Slide[] =
        handleViewAll && (!infiniteScroll || entities.length >= entitiesTotalCount) ? [...entities, viewAll] : entities;
      setSlides(newSlides);
      setTotalCount(entitiesTotalCount);
    }
  }, [entities]);

  const getEntityCard = (entity: Entity): JSX.Element => {
    return (
      <EntityCard key={`${entity.entityId}-${id}`} entity={entity} cardSize={cardSize} clickOrigin={clickOrigin} />
    );
  };

  const getSlide = (slide: Slide, index: number): JSX.Element => {
    const uuid = self.crypto.getRandomValues(new Uint32Array(1))[0];
    switch (slide) {
      case skeleton:
        return <EntityCardSkeleton key={`${index}-${skeleton}-${uuid}-${id}`} cardSize={cardSize} />;
      case viewAll:
        return (
          <ViewAllCard key={`${index}-${viewAll}-${uuid}-${id}`} cardSize={cardSize} handleViewAll={handleViewAll} />
        );
      default:
        return getEntityCard(slide);
    }
  };

  const fetchMoreEntitiesFunction = (): void => {
    if (entities && networkStatus !== NetworkStatus.fetchMore && data.entities.pageInfo?.hasNextPage) {
      fetchMoreItems({ offset: entities.length });
    }
  };

  const getHeader = (): JSX.Element => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={6} flexWrap="nowrap">
        <Stack direction="row" spacing={4} alignItems="center">
          <Typography component="h2" variant="h5" noWrap>
            {title}
          </Typography>
          {handleViewAll && (
            <Button size="small" onClick={handleViewAll}>
              {t("cta.viewAll")}
            </Button>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" display={{ xs: "none", mobile: "flex" }} flexWrap="nowrap">
          <LeftArrowButton />
          <RightArrowButton
            fetchMoreEntities={infiniteScroll ? fetchMoreEntitiesFunction : undefined}
            limit={handleViewAll ? totalCount + 1 : totalCount}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <ScrollMenuContainer cardSize={cardSize}>
      <ScrollMenu Header={getHeader}>
        {enableLoadingState ? (
          slides.map((card, index) => getSlide(card, index))
        ) : entitiesReady ? (
          entities.map((slide: Entity) => getEntityCard(slide))
        ) : (
          <></>
        )}
      </ScrollMenu>
    </ScrollMenuContainer>
  );
};

export default EntityCardCarousel;
