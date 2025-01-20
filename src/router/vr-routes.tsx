import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import paths from "../common/paths";
import EntityDetailsDialog from "../components/entities/entity-content/entity-details-dialog/entity-details-dialog.component";
import HomeLayout from "../components/layout/home-layout/home-layout.component";
import PageLayout from "../components/layout/page-layout/page-layout.component";
import RecommendedEventsPageContextProvider from "../context/recommended-events-page/recommended-events-page-context-provider";
import RecommendedPlacesPageContextProvider from "../context/recommended-places-page/recommended-places-page-context-provider";
import SearchPageContextProvider from "../context/search-page/search-page-context-provider";
import Details from "../pages/details/details.page";
import Error404 from "../pages/error-404/error-404.page";
import Error500 from "../pages/error-500/error-500.page";
import LostInTheMetaverse from "../pages/lost-in-the-metaverse/lost-in-the-metaverse.page";
import Overview from "../pages/overview/overview.page";
import RecommendedEvents from "../pages/recommended-events/recommended-events.page";
import RecommendedPlaces from "../pages/recommended-places/recommended-places.page";
import Search from "../pages/search/search.page";
import { LocationState } from "./router";

interface Props {
  state?: LocationState;
}

const VrRoutes: React.FC<Props> = ({ state }) => {
  const location = useLocation();

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={paths.landing} element={<Navigate to={paths.home} />} />
        <Route element={<PageLayout />}>
          <Route element={<HomeLayout />}>
            <Route path={paths.home} element={<Overview />} />
            <Route
              path={paths.places}
              element={
                <RecommendedPlacesPageContextProvider>
                  <RecommendedPlaces />
                </RecommendedPlacesPageContextProvider>
              }
            />
            <Route
              path={paths.events}
              element={
                <RecommendedEventsPageContextProvider>
                  <RecommendedEvents />
                </RecommendedEventsPageContextProvider>
              }
            />
          </Route>
          <Route path={paths.entityDetails.path} element={<Details />} />
          <Route
            path={paths.search}
            element={
              <SearchPageContextProvider>
                <Search />
              </SearchPageContextProvider>
            }
          />
        </Route>
        {/* Errors */}
        <Route path={paths.error500} element={<Error500 />} />
        <Route path={paths.error404} element={<Error404 />} />
        <Route path={paths.lostInTheMetaverse} element={<LostInTheMetaverse />} />
        <Route path="*" element={<Navigate to={paths.error404} replace />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path={paths.entityDetails.path} element={<EntityDetailsDialog />} />
        </Routes>
      )}
    </>
  );
};

export default VrRoutes;
