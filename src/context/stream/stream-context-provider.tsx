import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApolloClient } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Notification } from "@src/common/graphql/generated/user.schema.graphql";
import { useAuthContext } from "@src/context/auth/auth-context";
import { StreamContext, StreamContextInterface } from "@src/context/stream/stream-context";
import useNotificationsToken from "@src/hooks/user/use-get-notifications-token.hook";
import useNotificationsStatus from "@src/hooks/user/use-notifications-status.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import { SubscribeCallback } from "faye";
import { connect, RealTimeMessage, StreamClient, StreamFeed } from "getstream";

const streamApiKey =
  process.env.REACT_APP_ENV === "prod"
    ? "cfnndvskrewd"
    : process.env.REACT_APP_ENV === "dev"
    ? "bnhcqjzg297a"
    : "z4mbattj4xbf";
const streamAppId =
  process.env.REACT_APP_ENV === "prod" ? "1230019" : process.env.REACT_APP_ENV === "dev" ? "1230728" : "1232833";

const StreamContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { showToast } = useToast();
  const { t } = useTranslation();

  const apolloClient = useApolloClient();
  const { connected, profile } = useAuthContext();

  const { getNotificationsToken } = useNotificationsToken();
  const { getNotificationsStatus } = useNotificationsStatus();

  const [streamClient, setStreamClient] = useState<StreamClient | null>(null);
  const [notificationsFeed, setNotificationsFeed] = useState<StreamFeed | undefined>(undefined);
  const [userHasUnseenNotifications, setUserHasUnseenNotifications] = useState(false);

  const flushStream = (): void => {
    if (notificationsFeed) {
      notificationsFeed.unsubscribe();
      setNotificationsFeed(undefined);
    }
    setStreamClient(null);
  };

  const getHasUnseenNotifications = (): void => {
    void getNotificationsStatus({
      variables: { userId: profile?.userId },
      onCompleted: data => setUserHasUnseenNotifications(data.notificationsStatus.hasUnseenNotifications),
    });
  };

  const processNewNotifications: SubscribeCallback<RealTimeMessage> = (data): void => {
    if (!userHasUnseenNotifications && (data.new.length > 0 || data.deleted.length > 0)) {
      getHasUnseenNotifications();
    }
  };

  const subscribeToNotificationFeed = async (feed: StreamFeed): Promise<void> => {
    try {
      await feed.subscribe(processNewNotifications);
      getHasUnseenNotifications();
    } catch (error) {
      Sentry.captureException(error);
      return;
    }
  };

  const connectStreamClient = (): void => {
    void getNotificationsToken({
      onCompleted: data => {
        const client = connect(streamApiKey, data?.notificationsToken.token, streamAppId);
        setStreamClient(client);

        const feed = client?.feed("notifications", profile?.userId);
        setNotificationsFeed(feed);

        void subscribeToNotificationFeed(feed);
      },
    });
  };

  useEffect(() => {
    if (connected) {
      connectStreamClient();
    } else {
      flushStream();
    }

    return flushStream;
  }, [connected]);

  useEffect(() => {
    if (connected && profile) {
      getHasUnseenNotifications();
    }
  }, [profile?.notificationSettings]);

  const markAsRead = (feed: StreamFeed, notification: Notification): void => {
    feed
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .get({ mark_read: [notification.id] })
      .then(() => {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify(notification),
          fields: {
            isRead: () => true,
          },
        });
      })
      .catch(_ => showToast(t("error.generic")));
  };

  const markAllAsRead = (feed: StreamFeed, notifications?: Notification[]): void => {
    if (!notifications || notifications.length === 0) {
      return;
    }

    // Marks all-read only from the first in the list and older of the rendered notifications
    // Prevents from marking unread notifications that aren't seen yet
    const firstInTheListNotificationId = notifications[0].id;
    feed
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .get({ id_lte: firstInTheListNotificationId, mark_read: true })
      .then(() => {
        notifications.forEach(notification => {
          apolloClient.cache.modify({
            id: apolloClient.cache.identify(notification),
            fields: {
              isRead: () => true,
            },
          });
        });
      })
      .catch(_ => showToast(t("error.generic")));
  };

  const streamContextValue: StreamContextInterface = useMemo(
    () =>
      streamClient && notificationsFeed
        ? {
            connectedToStream: true,
            userHasUnseenNotifications,
            setNotificationsAsSeen: () => setUserHasUnseenNotifications(false),
            markAsRead: (notification: Notification) => markAsRead(notificationsFeed, notification),
            markAllAsRead: (notifications?: Notification[]) => markAllAsRead(notificationsFeed, notifications),
          }
        : { connectedToStream: false },
    [
      streamClient,
      notificationsFeed,
      userHasUnseenNotifications,
      setUserHasUnseenNotifications,
      markAsRead,
      markAllAsRead,
    ],
  );

  return <StreamContext.Provider value={streamContextValue}>{children}</StreamContext.Provider>;
};

export default StreamContextProvider;
