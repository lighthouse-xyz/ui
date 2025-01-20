export enum TrackEvent {
  openChromeStore = "openChromeStore",
  trackUtm = "trackUtm",
}

export enum FollowOrigin {
  connectionsDialog = "connectionsDialog",
  entityCard = "entityCard",
  lostInTheMetaversePage = "lostInTheMetaversePage",
  notifications = "notifications",
  onboarding = "onboarding",
  profile = "profile",
  sidePanel = "sidePanel",
}

export enum OpenChromeStoreOrigin {
  accountSettings = "accountSettings",
  afterThirdJump = "afterThirdJump",
  alertSidePanel = "alertSidePanel",
  banner = "banner",
  footer = "footer",
  onboarding = "onboarding",
  onboardingChecklist = "onboardingChecklist",
}

export enum TouchOrigin {
  directUrl = "directUrl",
  featuredCarousel = "featuredCarousel",
  fromFavoriteCreatorsCarousel = "fromFavoriteCreatorsCarousel",
  liveEventsCarousel = "liveEventsCarousel",
  pinnedCarousel = "pinnedCarousel",
  resultsList = "resultsList",
  trendingCarousel = "trendingCarousel",
}

export interface TouchMetadata {
  path: string;
  origin: TouchOrigin;
}
