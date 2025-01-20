import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import paths from "../common/paths";
import ReportDialog from "../components/common/report-dialog/report-dialog.component";
import CustomEventDialog from "../components/entities/custom-event-dialog/custom-event-dialog.component";
import CustomPlaceDialog from "../components/entities/custom-place-dialog/custom-place-dialog.component";
import DeleteEventConfirmationDialog from "../components/entities/delete-event-confirmation-dialog/delete-event-confirmation-dialog.component";
import DeletePlaceConfirmationDialog from "../components/entities/delete-place-confirmation-dialog/delete-place-confirmation-dialog.component";
import EntityDetailsDialog from "../components/entities/entity-content/entity-details-dialog/entity-details-dialog.component";
import AddGateDialog from "../components/god-mode/add-gate-dialog/add-gate-dialog.component";
import GodModeLightkeeperStatsLayout from "../components/layout/god-mode-lightkeeper-stats-layout/god-mode-lightkeeper-stats-layout.component";
import HomeLayout from "../components/layout/home-layout/home-layout.component";
import LandingLayout from "../components/layout/landing-layout/landing-layout.component";
import PageLayout from "../components/layout/page-layout/page-layout.component";
import ClaimAvatarsDialog from "../components/onboarding/claim-avatars-dialog/claim-avatars-dialog.component";
import CustomStatusDialog from "../components/user/custom-status-dialog/custom-status-dialog.component";
import DeleteAccountConfirmationDialog from "../components/user/delete-account-confirmation-dialog/delete-account-confirmation-dialog.component";
import EditProfileDialog from "../components/user/edit-profile-dialog/edit-profile-dialog.component";
import InviteFriendDialog from "../components/user/invite-friend-dialog/invite-friend-dialog.component";
import PeoplePageContextProvider from "../context/people-page/people-page-context-provider";
import RecommendedEventsPageContextProvider from "../context/recommended-events-page/recommended-events-page-context-provider";
import RecommendedPlacesPageContextProvider from "../context/recommended-places-page/recommended-places-page-context-provider";
import SearchPageContextProvider from "../context/search-page/search-page-context-provider";
import AkuChapter from "../pages/aku-chapter/aku-chapter.page";
import AkuLanding from "../pages/aku-landing/aku-landing.page";
import ClaimHandle from "../pages/claim-handle/claim-handle.page";
import Details from "../pages/details/details.page";
import Error404 from "../pages/error-404/error-404.page";
import Error500 from "../pages/error-500/error-500.page";
import GodMode from "../pages/god-mode/god-mode.page";
import Interested from "../pages/interested/interested.page";
import JumpHistory from "../pages/jump-history/jump-history.page";
import Landing from "../pages/landing/landing.page";
import LightkeeperLeaderboard from "../pages/lightkeeper-leaderboard/lightkeeper-leaderboard.page";
import LightkeeperStats from "../pages/lightkeeper-stats/lightkeeper-stats.page";
import Likes from "../pages/likes/likes.page";
import LostInTheMetaverse from "../pages/lost-in-the-metaverse/lost-in-the-metaverse.page";
import Notifications from "../pages/notifications/notifications.page";
import Overview from "../pages/overview/overview.page";
import People from "../pages/people/people.page";
import Profile from "../pages/profile/profile.page";
import RecommendedEvents from "../pages/recommended-events/recommended-events.page";
import RecommendedPlaces from "../pages/recommended-places/recommended-places.page";
import Search from "../pages/search/search.page";
import Settings from "../pages/settings/settings.page";
import YourEvents from "../pages/your-events/your-events.page";
import YourPlaces from "../pages/your-places/your-places.page";
import { LocationState } from "./router";

interface Props {
  state?: LocationState;
}

const MainRoutes: React.FC<Props> = ({ state }) => {
  const location = useLocation();

  const parentRoute = location.pathname.substring(0, location.pathname.lastIndexOf("/"));

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<LandingLayout />}>
          <Route path={paths.landing} element={<Landing />} />
        </Route>
        <Route path={paths.claimHandle} element={<ClaimHandle />} />
        <Route path={paths.akuLanding} element={<AkuLanding />} />
        <Route path={paths.akuChapter.path} element={<AkuChapter />} />
        <Route path={paths.godMode} element={<GodMode />} />
        <Route element={<GodModeLightkeeperStatsLayout />}>
          <Route path={paths.godModeLightkeeperStats} element={<LightkeeperStats godMode />} />
          <Route path={paths.godModeLightkeeperLeaderboard} element={<LightkeeperLeaderboard godMode />} />
        </Route>
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
            <Route
              path={paths.people}
              element={
                <PeoplePageContextProvider>
                  <People />
                </PeoplePageContextProvider>
              }
            />
          </Route>
          <Route path={paths.entityDetails.path} element={<Details />} />
          <Route path={paths.interested} element={<Interested />} />
          <Route path={paths.lightkeeperStats} element={<LightkeeperStats />} />
          <Route path={paths.lightkeeperLeaderboard} element={<LightkeeperLeaderboard />} />
          <Route path={paths.likes} element={<Likes />} />
          <Route path={paths.jumpHistory} element={<JumpHistory />} />
          <Route path={paths.notifications} element={<Notifications />} />
          <Route path={paths.profile.path} element={<Profile />} />
          <Route path={paths.yourEvents} element={<YourEvents />} />
          <Route path={paths.yourPlaces} element={<YourPlaces />} />
          <Route
            path={paths.search}
            element={
              <SearchPageContextProvider>
                <Search />
              </SearchPageContextProvider>
            }
          />
          <Route path={paths.settings} element={<Settings />} />
        </Route>
        {/* Redirects for dialogs */}
        <Route path={paths.customStatus} element={<Navigate to={paths.home} replace />} />
        <Route path={paths.inviteFriend} element={<Navigate to={paths.home} replace />} />
        <Route path={paths.editProfile} element={<Navigate to={paths.home} replace />} />
        <Route path={paths.deleteAccount} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.createEvent} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.editEvent} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.deleteEvent} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.createPlace} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.editPlace} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.deletePlace} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.report} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.claimAvatars} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.godModeCreateEvent} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.godModeEditEvent} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.godModeCreatePlace} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.godModeEditPlace} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.godModeCreateGate} element={<Navigate to={parentRoute} replace />} />
        <Route path={paths.godModeEditGate} element={<Navigate to={parentRoute} replace />} />
        {/* Errors */}
        <Route path={paths.error500} element={<Error500 />} />
        <Route path={paths.error404} element={<Error404 />} />
        <Route path={paths.lostInTheMetaverse} element={<LostInTheMetaverse />} />
        <Route path="*" element={<Navigate to={paths.error404} replace />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path={paths.customStatus} element={<CustomStatusDialog />} />
          <Route path={paths.inviteFriend} element={<InviteFriendDialog />} />
          <Route path={paths.entityDetails.path} element={<EntityDetailsDialog />} />
          <Route path={paths.editProfile} element={<EditProfileDialog />} />
          <Route path={paths.createEvent} element={<CustomEventDialog />} />
          <Route path={paths.editEvent} element={<CustomEventDialog />} />
          <Route path={paths.createPlace} element={<CustomPlaceDialog />} />
          <Route path={paths.editPlace} element={<CustomPlaceDialog />} />
          <Route path={paths.deleteAccount} element={<DeleteAccountConfirmationDialog />} />
          <Route path={paths.deleteEvent} element={<DeleteEventConfirmationDialog />} />
          <Route path={paths.deletePlace} element={<DeletePlaceConfirmationDialog />} />
          <Route path={paths.report} element={<ReportDialog />} />
          <Route path={paths.claimAvatars} element={<ClaimAvatarsDialog />} />
          <Route path={paths.godModeCreateEvent} element={<CustomEventDialog godMode />} />
          <Route path={paths.godModeEditEvent} element={<CustomEventDialog godMode />} />
          <Route path={paths.godModeCreatePlace} element={<CustomPlaceDialog godMode />} />
          <Route path={paths.godModeEditPlace} element={<CustomPlaceDialog godMode />} />
          <Route path={paths.godModeCreateGate} element={<AddGateDialog />} />
          <Route path={paths.godModeEditGate} element={<EditProfileDialog />} />
        </Routes>
      )}
    </>
  );
};

export default MainRoutes;
