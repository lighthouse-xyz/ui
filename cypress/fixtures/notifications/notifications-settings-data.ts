import { ProfileResults, UpdateNotificationSettingsResults } from "../../utils/query-results.interface";

export const profileFullTrueSettings: ProfileResults = {
  data: {
    profileFromToken: {
      alias: "Test User",
      attendingMvfw: true,
      banner: null,
      category: null,
      customStatus: null,
      description: null,
      discord: null,
      discordUsername: null,
      followerCount: 0,
      followingCount: 2,
      followingStatus: null,
      friendCount: 3,
      handle: null,
      instagram: null,
      isOnline: true,
      medium: null,
      mirror: null,
      notificationSettings: {
        eventGoLive: true,
        follow: true,
        followingActivity: true,
        friendActivity: true,
        ownedEntity: true,
        __typename: "NotificationSettings",
      },
      picture: null,
      tags: [],
      twitter: null,
      userId: "lh_us_0943cb9b28fc6d774ca260f6fa89ab35c23eeb907d06dbd86e4e50172bed0acb",
      walletAddress: null,
      website: null,
      __typename: "Profile",
      createdAt: "",
      updatedAt: "",
    },
  },
};

export const profileMixedSettings: ProfileResults = {
  data: {
    profileFromToken: {
      alias: "Test User",
      attendingMvfw: true,
      banner: null,
      category: null,
      customStatus: null,
      description: null,
      discord: null,
      discordUsername: null,
      followerCount: 0,
      followingCount: 2,
      followingStatus: null,
      friendCount: 3,
      handle: null,
      instagram: null,
      isOnline: true,
      medium: null,
      mirror: null,
      notificationSettings: {
        eventGoLive: true,
        follow: false,
        followingActivity: true,
        friendActivity: false,
        ownedEntity: true,
        __typename: "NotificationSettings",
      },
      picture: null,
      tags: [],
      twitter: null,
      userId: "lh_us_0943cb9b28fc6d774ca260f6fa89ab35c23eeb907d06dbd86e4e50172bed0acb",
      walletAddress: null,
      website: null,
      __typename: "Profile",
      createdAt: "",
      updatedAt: "",
    },
  },
};

export const profileFullFalseSettings: ProfileResults = {
  data: {
    profileFromToken: {
      alias: "Test User",
      attendingMvfw: true,
      banner: null,
      category: null,
      customStatus: null,
      description: null,
      discord: null,
      discordUsername: null,
      followerCount: 0,
      followingCount: 2,
      followingStatus: null,
      friendCount: 3,
      handle: null,
      instagram: null,
      isOnline: true,
      medium: null,
      mirror: null,
      notificationSettings: {
        eventGoLive: false,
        follow: false,
        followingActivity: false,
        friendActivity: false,
        ownedEntity: false,
        __typename: "NotificationSettings",
      },
      picture: null,
      tags: [],
      twitter: null,
      userId: "lh_us_0943cb9b28fc6d774ca260f6fa89ab35c23eeb907d06dbd86e4e50172bed0acb",
      walletAddress: null,
      website: null,
      __typename: "Profile",
      createdAt: "",
      updatedAt: "",
    },
  },
};

export const notificationsSettings: UpdateNotificationSettingsResults = {
  data: {
    updateNotificationSettings: {
      eventGoLive: true,
      follow: true,
      followingActivity: false,
      friendActivity: true,
      ownedEntity: true,
      __typename: "NotificationSettings",
    },
  },
};

export const notificationsSettingsAlt: UpdateNotificationSettingsResults = {
  data: {
    updateNotificationSettings: {
      eventGoLive: true,
      follow: false,
      followingActivity: false,
      friendActivity: false,
      ownedEntity: false,
      __typename: "NotificationSettings",
    },
  },
};
