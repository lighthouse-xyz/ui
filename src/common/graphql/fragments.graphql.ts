import { gql } from "@apollo/client";

const coreEventFields = gql`
  fragment CoreEventFields on Event {
    description
    entityId
    estateId
    eventCategories: categories
    featuredMedia
    image
    interested
    isAllDay
    isRecurring
    jumpable
    latestFinishAt
    liked
    live
    name
    nextFinishAt
    nextStartAt
    owner
    ownerUser
    parcelId
    past
    pinned
    tags
    totalAttendees
    type
    world
  }
`;

const coreEstateFields = gql`
  fragment CoreEstateFields on Estate {
    canViewMarketplace
    description
    entityId
    featuredMedia
    image
    jumpable
    liked
    name
    owner
    ownerUser
    pinned
    type
    world
  }
`;

const coreParcelFields = gql`
  fragment CoreParcelFields on Parcel {
    canViewMarketplace
    description
    entityId
    featuredMedia
    image
    jumpable
    liked
    name
    owner
    ownerUser
    parcelCategories: categories
    pinned
    tags
    type
    url
    world
  }
`;

const coreMemberFields = gql`
  fragment CoreMemberFields on Member {
    address
    category
    description
    entityId
    followerCount
    followingCount
    followingStatus
    friendCount
    handle
    image
    name
    type
  }
`;

const connectionFieldsFromProfile = gql`
  fragment ConnectionFieldsFromProfile on Profile {
    alias
    category
    customStatus
    handle
    isOnline
    location {
      lastSeenAt
      url
      world
    }
    picture
    userId
    walletAddress
  }
`;

const notificationSettingsFields = gql`
  fragment NotificationSettingsFields on NotificationSettings {
    eventGoLive
    follow
    followingActivity
    friendActivity
    ownedEntity
  }
`;

const coreProfileFields = gql`
  fragment CoreProfileFields on Profile {
    alias
    banner
    category
    customStatus
    description
    discord
    discordUsername
    followerCount
    followingCount
    followingStatus
    friendCount
    handle
    instagram
    isOnline
    medium
    mirror
    picture
    tags
    twitter
    userId
    walletAddress
    website
  }
`;

const locationStatusFields = gql`
  fragment LocationStatusFields on LocationStatus {
    activatePublicLink
    allowsSharingLocation
    lastLocation {
      lastSeenAt
      url
      world
    }
    locationSharingType
  }
`;

const userEntityRelationshipFields = gql`
  fragment UserEntityRelationshipFields on UserEntityRelationship {
    entityId
    userId
  }
`;

const isOnlineFieldFromProfile = gql`
  fragment IsOnlineFieldFromProfile on Profile {
    isOnline
    userId
  }
`;

const statusFields = gql`
  fragment StatusFields on Status {
    appearOffline
    customStatus
    customStatusExpiresAt
    isOnline
  }
`;

const userStateFields = gql`
  fragment UserStateFields on UserState {
    frontendState
    onboardingCompleted
  }
`;

export {
  connectionFieldsFromProfile,
  coreEstateFields,
  coreEventFields,
  coreMemberFields,
  coreParcelFields,
  coreProfileFields,
  isOnlineFieldFromProfile,
  locationStatusFields,
  notificationSettingsFields,
  statusFields,
  userEntityRelationshipFields,
  userStateFields,
};
