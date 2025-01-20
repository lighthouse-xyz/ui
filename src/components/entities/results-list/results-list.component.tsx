import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";

import EntityCard from "../entity-content/entity-card/entity-card.component";
import { ListEntitiesContainer } from "./results-list.style";
import { NetworkStatus } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as ArrowLeft } from "@src/assets/icons/chevron-arrow-left-icon.svg";
import { ReactComponent as ArrowRight } from "@src/assets/icons/chevron-arrow-right-icon.svg";
import { TouchOrigin } from "@src/common/enums/track-events.enum";
import { Entity } from "@src/common/interfaces/entity.type";
import { QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import useFetchMore from "@src/hooks/utils/use-fetch-more.hook";
import { t } from "i18next";
import groupBy from "lodash.groupby";
import uniqby from "lodash.uniqby";

interface InfiniteScrollProps {
  enabled: boolean;
  setFullyLoaded?: (fullyLoaded: boolean) => void;
}

interface Props<T extends { entity: Entity } | Entity = Entity> {
  results: QueryEntitiesResults<T>;
  page?: number;
  tagDisplayed?: boolean;
  infiniteScroll?: InfiniteScrollProps;
  groupedBy?: (element: T) => [number, string]; //[key, label]
  noResultsIndicator?: JSX.Element;
  setPage?: (page: number) => void;
  editableEntities?: boolean;
}

const ResultsList = <T extends { entity: Entity } | Entity = Entity>({
  results: { data, loading, error, networkStatus, fetchMore },
  page,
  tagDisplayed = false,
  infiniteScroll,
  groupedBy,
  noResultsIndicator = (
    <NoResultsFound title={t("noResults.generic.title")} subtitle={t("noResults.generic.subtitle")} size="large" />
  ),
  setPage,
  editableEntities = false,
}: Props<T>): JSX.Element => {
  const pageNumberLimit = 450;

  const entityList: T[] | undefined = data?.entities.list;
  const totalCount: number = data?.entities.totalCount ?? 0;
  const isLoading: boolean = (loading && !entityList) || networkStatus === NetworkStatus.fetchMore;
  const noResults: boolean = (!entityList && !error && !loading) || (!!entityList && totalCount === 0);

  const [errorFetchMore, setErrorFetchMore] = useState<Error | null>(null);
  const { fetchMoreItems } = useFetchMore<T>(fetchMore, "entities", setErrorFetchMore);

  const extractEntity = (entityObject: T): Entity => {
    return "entity" in entityObject ? entityObject.entity : entityObject;
  };

  const computeEntityKey = (entityObject: T, index: number, group?: string): string => {
    return "entityId" in entityObject
      ? `${index}-${entityObject.entityId}-${group as string}`
      : `${index}-${entityObject.entity.entityId}-${group as string}`;
  };

  const getEntitiesList = (list: T[]): JSX.Element => {
    return (
      <div>
        {groupedBy ? (
          <>
            {Object.entries(groupBy(list, groupedBy)).map(([group, entities], groupIndex) => (
              <Stack
                spacing={entitiesResultLayout.titleContentGap}
                marginTop={groupIndex !== 0 ? entitiesResultLayout.titleContentGap : undefined}
                key={group}>
                <Typography variant="h5">{group.split(",")[1]}</Typography>
                <ListEntitiesContainer>
                  {uniqby(entities, "entity").map((entity, index) => (
                    <EntityCard
                      key={computeEntityKey(entity, index, group)}
                      clickOrigin={TouchOrigin.resultsList}
                      entity={extractEntity(entity)}
                      tagDisplayed={tagDisplayed}
                      editMode={editableEntities}
                    />
                  ))}
                </ListEntitiesContainer>
              </Stack>
            ))}
          </>
        ) : (
          <ListEntitiesContainer>
            {list.map((entity, index) => (
              <EntityCard
                key={computeEntityKey(entity, index)}
                clickOrigin={TouchOrigin.resultsList}
                entity={extractEntity(entity)}
                tagDisplayed={tagDisplayed}
                editMode={editableEntities}
              />
            ))}
          </ListEntitiesContainer>
        )}
        {fetchMore && infiniteScroll?.enabled && networkStatus !== NetworkStatus.fetchMore && (
          <InView
            onChange={inView => {
              infiniteScroll?.setFullyLoaded &&
                data?.entities.pageInfo?.hasNextPage === false &&
                infiniteScroll.setFullyLoaded(true);

              if (inView && data?.entities.pageInfo?.hasNextPage) {
                fetchMoreItems({ offset: list.length });
              }
            }}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    if (infiniteScroll?.setFullyLoaded && (error || errorFetchMore || data?.entities.totalCount === 0)) {
      infiniteScroll.setFullyLoaded(true);
    }
  }, [error, errorFetchMore, data]);

  return (
    <>
      {!!entityList && totalCount > 0 && (
        <Stack spacing={8}>
          {getEntitiesList(entityList)}

          {!!page && !!setPage && !infiniteScroll && (
            <Stack alignItems="center">
              <Pagination
                count={
                  Math.ceil(totalCount / entitiesResultLayout.itemsPerPage) > pageNumberLimit
                    ? pageNumberLimit
                    : Math.ceil(totalCount / entitiesResultLayout.itemsPerPage)
                }
                page={page}
                boundaryCount={2}
                onChange={(_event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
                renderItem={item => <PaginationItem components={{ previous: ArrowLeft, next: ArrowRight }} {...item} />}
              />
            </Stack>
          )}
        </Stack>
      )}

      {noResults && <>{noResultsIndicator}</>}

      {isLoading && <LoadingIndicator size="70px" />}

      {!!error && <div>{error.message}</div>}

      {!!errorFetchMore && <div>{errorFetchMore.message}</div>}
    </>
  );
};

export default ResultsList;
