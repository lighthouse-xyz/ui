import React, { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";

import ConnectionsListItem from "../connections-list-item/connections-list-item.component";
import {
  CollapseButton,
  ConnectionsListContainer,
  CustomWidthTooltip,
  DividerStyled,
  TextCounter,
} from "./connections-list.style";
import { NetworkStatus } from "@apollo/client";
import { Box, Button, Collapse, Stack, Typography, useTheme } from "@mui/material";
import { ReactComponent as ArrowDownIcon } from "@src/assets/icons/chevron-arrow-down-icon.svg";
import { ReactComponent as ArrowUpIcon } from "@src/assets/icons/chevron-arrow-up-icon.svg";
import { ReactComponent as HelpIcon } from "@src/assets/icons/help-circle-icon.svg";
import { ConnectionType } from "@src/common/enums/connections-type.enum";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";
import { QueryProfilesResults } from "@src/common/interfaces/query-results.interface";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useFetchMore from "@src/hooks/utils/use-fetch-more.hook";

interface EmptyStateProps {
  text: string;
  cta?: { label: string; onClick: () => void };
}

interface ViewAllProps {
  displayed: boolean;
  onClick: () => void;
}

interface Props {
  connectionType: ConnectionType;
  results: QueryProfilesResults;
  userId?: string;
  context: "sidePanel" | "dialog";
  endActionType: "followButton" | "followIcon" | "jumpIcon";
  emptyState?: EmptyStateProps;
  viewAll?: ViewAllProps;
  collapsible?: boolean;
}

// eslint-disable-next-line complexity
const ConnectionsList: React.FC<Props> = ({
  connectionType,
  results: { data, loading, error, networkStatus, fetchMore },
  userId,
  context,
  endActionType,
  emptyState,
  viewAll,
  collapsible = false,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const id = useId();

  const { connected, profile: currentUserProfile, loading: loadingCurrentUser } = useAuthContext();
  const { fetchMoreItems } = useFetchMore<Profile>(fetchMore);

  const [openCollapse, setOpenCollapse] = useState(true);
  // Diffence between the initial totalConnections and the real total count that changes after follow or unfollow from dialog.
  // Used when displaying the connections list of the current user where includeFollowButton is true.
  const [diffCount, setDiffCount] = useState(0);

  const isFriendsOrFollowing = connectionType === ConnectionType.following || connectionType === ConnectionType.friends;
  const fromSidePanel = context === "sidePanel";
  const friendsOrFollowingFromSidePanelNotConnected =
    isFriendsOrFollowing && fromSidePanel && !loadingCurrentUser && !connected;
  const isCurrentUser = currentUserProfile?.userId === userId;
  const useDiffCount = isCurrentUser && !fromSidePanel;
  const connections = data?.entities?.list;
  const totalConnections = data?.entities?.totalCount ?? 0;
  const hasConnections = !!connections && totalConnections > 0;
  const noConnections =
    (!connections && !error && !loading && !loadingCurrentUser) ||
    (!!connections && totalConnections === 0) ||
    friendsOrFollowingFromSidePanelNotConnected;
  const isLoading =
    (loading &&
      !connections &&
      networkStatus !== NetworkStatus.refetch &&
      !friendsOrFollowingFromSidePanelNotConnected) ||
    networkStatus === NetworkStatus.fetchMore ||
    loadingCurrentUser;

  const mapConnectionType: { [key in ConnectionType]?: { label: string; subtitle?: string; help?: string } } = {
    [ConnectionType.followers]: {
      label: t("profile.followers.label"),
      subtitle: t("profile.followers.followingBackResult"),
    },
    [ConnectionType.following]: {
      label: t("profile.following.label"),
    },
    [ConnectionType.friends]: {
      label: t("profile.friends.label"),
      subtitle: t("profile.friends.unfollowingResult"),
    },
    [ConnectionType.openInvites]: {
      label: t("openInvites.label"),
      help: t("openInvites.description"),
    },
  };

  const getHeader = (): JSX.Element => {
    const header = (
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h8">{mapConnectionType[connectionType]?.label}</Typography>
          {!!mapConnectionType[connectionType]?.help && (
            <CustomWidthTooltip title={mapConnectionType[connectionType]?.help} arrow placement="top">
              <HelpIcon color={theme.palette.action.active} />
            </CustomWidthTooltip>
          )}
          <DividerStyled>|</DividerStyled>
          <TextCounter>{totalConnections}</TextCounter>
        </Stack>
        {!fromSidePanel && isCurrentUser && !!mapConnectionType[connectionType]?.subtitle && (
          <Typography variant="caption" color="text.secondary">
            {mapConnectionType[connectionType]?.subtitle}
          </Typography>
        )}
      </Stack>
    );

    return collapsible ? (
      <CollapseButton
        id={`collapse-button-${id}`}
        fullWidth
        color="inherit"
        endIcon={
          openCollapse ? (
            <ArrowUpIcon color={theme.palette.action.active} />
          ) : (
            <ArrowDownIcon color={theme.palette.action.active} />
          )
        }
        onClick={() => setOpenCollapse(!openCollapse)}>
        {header}
      </CollapseButton>
    ) : (
      header
    );
  };

  const emptyStateComponent = (
    <Stack spacing={3} alignItems="center">
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {emptyState?.text}
      </Typography>
      {!!emptyState?.cta && <Button onClick={emptyState?.cta.onClick}>{emptyState.cta.label}</Button>}
    </Stack>
  );

  return noConnections && !emptyState ? null : (
    <Stack spacing={3}>
      {getHeader()}

      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        {hasConnections && (
          <ConnectionsListContainer gap={!fromSidePanel ? "12px" : "4px"}>
            <>
              {connections.map((connection, index) => (
                <ConnectionsListItem
                  key={`connections-list-item-${connection.userId}-${index}`}
                  connection={connection}
                  currentUserId={currentUserProfile?.userId}
                  endActionType={endActionType}
                  diffCount={useDiffCount ? diffCount : undefined}
                  setDiffCount={useDiffCount ? setDiffCount : undefined}
                />
              ))}

              {fetchMore && networkStatus !== NetworkStatus.fetchMore && !fromSidePanel && (
                <InView
                  onChange={inView => {
                    if (inView && data.entities.pageInfo?.hasNextPage) {
                      fetchMoreItems({ offset: connections.length + diffCount });
                    }
                  }}
                  threshold={0.5}
                />
              )}

              {!!viewAll && viewAll.displayed && (
                <Box alignSelf="center">
                  <Button size="small" onClick={viewAll.onClick}>
                    {t("cta.viewAll")}
                  </Button>
                </Box>
              )}
            </>
          </ConnectionsListContainer>
        )}

        {noConnections && !!emptyState && <>{emptyStateComponent}</>}

        {isLoading && <LoadingIndicator size="40px" />}

        {!!error && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t("error.fetchingConnections")}
          </Typography>
        )}
      </Collapse>
    </Stack>
  );
};

export default ConnectionsList;
