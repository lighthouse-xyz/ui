import { generatePath } from "react-router-dom";

import { AkuChapterName } from "./graphql/generated/user.schema.graphql";

const paths = {
  /* pages */
  landing: "/",
  akuLanding: "/aku",
  akuChapter: {
    path: "/aku/:chapterId",
    buildPath: (chapterId: AkuChapterName) => generatePath("/aku/:chapterId", { chapterId }),
  },
  claimHandle: "/claim",
  entityDetails: {
    path: "/details/:id",
    buildPath: (entityId: string) => generatePath("/details/:id", { id: entityId }),
  },
  events: "/events",
  godMode: "/god-mode",
  godModeLightkeeperStats: "/god-mode/lightkeeper-dashboard",
  godModeLightkeeperLeaderboard: "/god-mode/lightkeeper-dashboard/leaderboard",
  home: "/home",
  interested: "/interested",
  jumpHistory: "/jump-history",
  lightkeeperStats: "/lightkeeper-dashboard",
  lightkeeperLeaderboard: "/lightkeeper-dashboard/leaderboard",
  likes: "/likes",
  notifications: "/notifications",
  people: "/people",
  places: "/places",
  profile: {
    path: "/profile/:id",
    buildPath: (userIdOrHandle: string) => generatePath("/profile/:id", { id: userIdOrHandle }),
  },
  yourEvents: "/profile/events",
  yourPlaces: "/profile/places",
  search: "/search",
  settings: "/settings",

  /* dialog */
  deleteAccount: "/account-settings/delete-account",
  claimAvatars: "/claim-avatars",
  customStatus: "/custom-status",
  godModeCreateEvent: "/god-mode/create-event",
  godModeCreateGate: "/god-mode/create-gate",
  godModeCreatePlace: "/god-mode/create-place",
  godModeEditEvent: "/god-mode/edit-event",
  godModeEditGate: "/god-mode/edit-gate",
  godModeEditPlace: "/god-mode/edit-place",
  inviteFriend: "/invite-friend",
  editProfile: "/profile/edit-profile",
  createEvent: "/profile/events/create-event",
  deleteEvent: "/profile/events/delete-event",
  editEvent: "/profile/events/edit-event",
  createPlace: "/profile/places/create-place",
  deletePlace: "/profile/places/delete-place",
  editPlace: "/profile/places/edit-place",
  report: "/report",

  /* error */
  error404: "/404",
  error500: "/500",
  lostInTheMetaverse: "/user-is-lost-in-the-metaverse",
};

export default paths;
