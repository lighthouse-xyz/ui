import React from "react";

import YourPlaces from "./your-places.page";
import { type MockedResponse } from "@apollo/client/testing";
import { UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import { PaginatedList, QueryEntitiesResults } from "@src/common/interfaces/query-results.interface";
import paths from "@src/common/paths";
import { AuthContext } from "@src/context/auth/auth-context";
import { getPlacesQuery } from "@src/hooks/discovery/use-get-places.hook";
import locales from "@src/locales/en/common.json";
import { customPlacesData, emptyCustomPlacesData } from "@src/tests/data-mocks/custom-places";
import { render, screen } from "@src/tests/test-utils";
import { AllProvidersCustomProps } from "@src/tests/test-utils.type";

const getApolloMocks = (dataMock: Pick<QueryEntitiesResults, "data">): MockedResponse<PaginatedList>[] => {
  return [
    {
      request: {
        query: getPlacesQuery,
        variables: {
          offset: 0,
          first: 20,
          sort: "nameAsc",
          where: {
            ownerUser: "123456",
          },
        },
      },
      result: dataMock,
    },
  ];
};

const YourPlacesWrapper: React.FC = () => {
  return (
    <AuthContext.Provider
      value={{
        profile: {
          category: UserCategory.explorer,
          attendingMvfw: true,
          walletAddress: "123456",
          createdAt: "",
          isOnline: true,
          tags: [],
          updatedAt: "",
          userId: "123456",
          followerCount: 0,
          followingCount: 0,
          friendCount: 0,
        },
        loading: false,
        connected: true,
        hasRole: () => false,
        logUserOut: () => null,
      }}>
      <YourPlaces />
    </AuthContext.Provider>
  );
};

const withCustomPlaces: { allProvidersCustomProps: AllProvidersCustomProps } = {
  allProvidersCustomProps: {
    initialPath: paths.yourPlaces,
    apolloMock: { mocks: getApolloMocks(customPlacesData) },
  },
};

const withoutCustomPlaces: { allProvidersCustomProps: AllProvidersCustomProps } = {
  allProvidersCustomProps: {
    initialPath: paths.yourPlaces,
    apolloMock: { mocks: getApolloMocks(emptyCustomPlacesData) },
  },
};

describe("Your Places Page", () => {
  it("should displays the page's basic elements", () => {
    render(<YourPlacesWrapper />, withCustomPlaces);
    expect(
      screen.getByRole("button", {
        name: new RegExp(locales.profile.backToProfile, "i"),
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: locales.places.create,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: locales.places.yourPlaces.label,
      }),
    ).toBeInTheDocument();
  });

  it("should displays the list of custom places created by the user", async () => {
    render(<YourPlacesWrapper />, withCustomPlaces);
    expect(await screen.findByText(locales.places.yourPlaces.pageDescription)).toBeVisible();
    expect(await screen.findByText(/Custom place 1/i)).toBeVisible();
    expect(await screen.findByText(/Custom place 2/i)).toBeVisible();
  });

  it("should displays a No places message if the user doesn't have custom places", async () => {
    render(<YourPlacesWrapper />, withoutCustomPlaces);
    expect(await screen.findByText(locales.noResults.yourPlaces.title)).toBeVisible();
  });
});
