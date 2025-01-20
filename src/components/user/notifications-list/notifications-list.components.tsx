import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";
import { createSearchParams, useNavigate } from "react-router-dom";

import { NetworkStatus } from "@apollo/client";
import { Button, Collapse, Stack, Typography } from "@mui/material";
import { Notification } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import Alert from "@src/components/common/alert/alert.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import NoResultsFound from "@src/components/common/no-results-found/no-results-found.component";
import NotificationItem from "@src/components/user/notification-item/notification-item.component";
import { useStreamContext } from "@src/context/stream/stream-context";
import useGetNotifications from "@src/hooks/user/use-get-notifications.hook";
import useFetchMore from "@src/hooks/utils/use-fetch-more.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import { SettingsTab } from "@src/pages/settings/settings.page";

type Props = {
  userId: string;
  areNotificationsTurnedOff?: boolean;
};

const NotificationsList: React.FC<Props> = ({ userId, areNotificationsTurnedOff }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const streamContext = useStreamContext();
  const { showToast } = useToast({ variant: "error" });

  const [openAlert, setOpenAlert] = useState(true);
  const { loading, error, data, fetchMore, networkStatus } = useGetNotifications({
    first: 7,
    userId,
  });
  const { fetchMoreItems } = useFetchMore(fetchMore, "notifications");

  const notificationsList: Notification[] | undefined = data?.notifications?.list;
  const totalCount: number = data?.notifications?.list?.length || 0;
  const isLoading: boolean = loading && !notificationsList;
  const noResults: boolean = (!notificationsList && !error && !loading) || (!!notificationsList && totalCount === 0);
  const hasNotifications = !!notificationsList;
  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  const markAllRead = (): void => {
    if (!streamContext.connectedToStream) {
      showToast(t("error.generic"));
      return;
    }

    streamContext.markAllAsRead(notificationsList);
  };

  return (
    <Stack spacing={5}>
      {hasNotifications && (
        <>
          {!noResults && (
            <Stack alignItems="flex-end">
              <Button size="small" onClick={markAllRead}>
                {t("notifications.markAllRead")}
              </Button>
            </Stack>
          )}

          {noResults ? (
            <>
              {openAlert && areNotificationsTurnedOff && (
                <Collapse in={openAlert}>
                  <Alert
                    severity="warning"
                    content={t("warning.noNotificationsSettings.title")}
                    action={{
                      content: t("warning.noNotificationsSettings.cta"),
                      onClick: () =>
                        navigate({
                          pathname: paths.settings,
                          search: `?${createSearchParams({ tab: SettingsTab.notifications }).toString()}`,
                        }),
                    }}
                    onClose={() => setOpenAlert(false)}
                  />
                </Collapse>
              )}
              <NoResultsFound
                title={t("noResults.generic.title")}
                subtitle={t("noResults.generic.subtitle")}
                size="large"
                marginTop="20px"
              />
            </>
          ) : (
            <Stack>
              {notificationsList.map((notification, index) => (
                <NotificationItem
                  key={`notification-item-${notification.id}-${index}`}
                  data={notification}
                  userId={userId}
                />
              ))}
              {fetchMore && !isFetchingMore && (
                <InView
                  onChange={inView => {
                    if (inView && data?.notifications.pageInfo?.hasNextPage) {
                      fetchMoreItems({
                        after: data.notifications.list?.[data.notifications.list.length - 1].id,
                        first: 7,
                      });
                    }
                  }}
                />
              )}
            </Stack>
          )}
        </>
      )}

      {(isLoading || isFetchingMore) && <LoadingIndicator size="70px" />}

      {!!error && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t("error.generic")}
        </Typography>
      )}
    </Stack>
  );
};

export default NotificationsList;
