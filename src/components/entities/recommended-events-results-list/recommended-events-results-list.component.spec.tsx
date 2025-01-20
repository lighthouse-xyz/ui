import React from "react";

import RecommendedEventsResultsList from "./recommended-events-results-list.component";
import { FilterCategory } from "@src/common/enums/filter-category.enum";
import { When } from "@src/common/enums/when.enum";
import {
  EntityType,
  EventSortingMethod,
  RelationshipToOwner,
  World,
} from "@src/common/graphql/generated/discovery.schema.graphql";
import { Filter } from "@src/common/interfaces/filter.interface";
import { entitiesResultLayout } from "@src/common/styles/style.const";
import { RecommendedEventsPageContext } from "@src/context/recommended-events-page/recommended-events-page-context";
import { useGetRecommendations } from "@src/hooks/discovery/use-get-recommendations.hook";
import { render, RenderResult } from "@testing-library/react";

jest.mock("../../../hooks/discovery/use-get-recommendations.hook");

const mockToday = "2022-02-01T00:00:00.000Z";
const mockUseGetRecommendations = useGetRecommendations as jest.MockedFunction<typeof useGetRecommendations>;

function renderRecommendedEventsResultsList(filtersSelected: Filter[]): RenderResult {
  return render(
    <RecommendedEventsPageContext.Provider
      value={{
        filtersSelected,
        setFiltersSelected: () => null,
        sortingMethod: EventSortingMethod.mostPopular,
        page: 1,
        setPage: () => null,
      }}>
      <RecommendedEventsResultsList />
    </RecommendedEventsPageContext.Provider>,
  );
}

describe("Recommended events results list component", () => {
  beforeEach(() => {
    mockUseGetRecommendations.mockImplementation(() => ({
      data: { entities: { __typename: "PaginatedEvents", list: [], totalCount: 0 } },
      loading: false,
    }));

    const mockedDate = new Date(mockToday);

    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);
  });

  it("should filter events correctly based on list of filters selected", () => {
    renderRecommendedEventsResultsList([
      { category: FilterCategory.world, option: World.hyperfy },
      { category: FilterCategory.world, option: World.lvcidia },
      { category: FilterCategory.createdBy, option: RelationshipToOwner.following },
    ]);

    expect(mockUseGetRecommendations).toHaveBeenNthCalledWith(1, {
      type: EntityType.event,
      variables: {
        first: entitiesResultLayout.itemsPerPage,
        offset: 0,
        sort: EventSortingMethod.mostPopular,
        where: {
          worlds: [World.hyperfy, World.lvcidia],
          relationshipToOwner: [RelationshipToOwner.following],
          nextFinishAt: { greaterThanOrEqual: mockToday },
        },
      },
    });
  });

  it("should filter out all past events if no filter is selected", () => {
    renderRecommendedEventsResultsList([]);

    expect(mockUseGetRecommendations).toHaveBeenNthCalledWith(1, {
      type: EntityType.event,
      variables: {
        first: entitiesResultLayout.itemsPerPage,
        offset: 0,
        sort: EventSortingMethod.mostPopular,
        where: { nextFinishAt: { greaterThanOrEqual: mockToday } },
      },
    });
  });

  it("should filter only past events if filter When:Past is selected", () => {
    renderRecommendedEventsResultsList([{ category: FilterCategory.when, option: When.past }]);

    expect(mockUseGetRecommendations).toHaveBeenCalledWith({
      type: EntityType.event,
      variables: {
        first: entitiesResultLayout.itemsPerPage,
        offset: 0,
        sort: EventSortingMethod.mostPopular,
        where: { nextFinishAt: { lessThanOrEqual: mockToday } },
      },
    });
  });
});
