import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ExtensionAlert from "../extension-alert/extension-alert.component";
import { SidePanelContainer } from "./connections-side-panel.style";
import { Collapse, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ConnectionType } from "@src/common/enums/connections-type.enum";
import { FriendListSortingMethod, RelationListSortingMethod } from "@src/common/graphql/generated/user.schema.graphql";
import { QueryProfilesResults } from "@src/common/interfaces/query-results.interface";
import paths from "@src/common/paths";
import { totalConnectionsLimitForSidePanel } from "@src/common/styles/style.const";
import ConditionalFeature from "@src/components/common/conditional-feature/conditional-feature.component";
import ConnectionsList from "@src/components/connections/connections-list/connections-list.component";
import ConnectionsListDialog from "@src/components/connections/connections-list-dialog/connections-list-dialog.component";
import FollowerRecommendationsList from "@src/components/connections/follower-recommendations-list/follower-recommendations-list";
import OnboardingFloatingButton from "@src/components/onboarding/onboarding-floating-button/onboarding-floating-button.component";
import InviteFriendButton from "@src/components/user/invite-friend-button/invite-friend-button.component";
import { useUserStateContext } from "@src/context/user-state/user-state-context";
import { useGetConnectionsSidePanel } from "@src/hooks/user/use-get-connections-side-panel.hook";
import { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";
import { useInterval } from "usehooks-ts";

interface Props {
  userId?: string;
  handle?: string;
}

const ConnectionsSidePanel: React.FC<Props> = ({ userId, handle }) => {
  const pollIntervalInMs = 15000;

  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { onboardingButtonDismissed } = useUserStateContext();

  const results = useGetConnectionsSidePanel({
    userId,
    firstFriendsAndFollowing: totalConnectionsLimitForSidePanel,
    offset: 0,
    followingSortBy: RelationListSortingMethod.isInWorld,
    friendsSortBy: FriendListSortingMethod.isInWorld,
  });

  useInterval(() => results.refetch && void results.refetch(), pollIntervalInMs);

  const [openConnectionsDialogType, setOpenConnectionsDialogType] = useState<ConnectionType | undefined>(undefined);

  const handleCloseDialog = (): void => {
    setOpenConnectionsDialogType(undefined);
    results.refetch && void results.refetch();
  };

  useEffect(() => {
    handleCloseDialog();
  }, [location.pathname]);

  const enableExtensionAlertOnceV3MigrationIsDone = false;

  return (
    <>
      <SidePanelContainer elevation={0} square sx={{ borderLeft: 1, borderLeftColor: theme.palette.divider }}>
        <Stack spacing={6} paddingRight={3}>
          <Stack>
            <InviteFriendButton userIdOrHandle={handle ?? userId} />
            {enableExtensionAlertOnceV3MigrationIsDone && <ExtensionAlert />}
          </Stack>

          <ConnectionsList
            connectionType={ConnectionType.friends}
            results={
              {
                ...results,
                data: results.data ? { entities: results.data.friends } : undefined,
              } as QueryProfilesResults
            }
            userId={userId}
            context="sidePanel"
            endActionType="jumpIcon"
            emptyState={{ text: t("profile.friends.description") }}
            viewAll={{
              displayed: (results.data?.friends?.totalCount ?? 0) > totalConnectionsLimitForSidePanel,
              onClick: () => setOpenConnectionsDialogType(ConnectionType.friends),
            }}
            collapsible
          />
          <ConnectionsList
            connectionType={ConnectionType.openInvites}
            results={
              {
                ...results,
                data: results.data ? { entities: results.data.openInvites } : undefined,
              } as QueryProfilesResults
            }
            userId={userId}
            context="sidePanel"
            endActionType="jumpIcon"
            emptyState={{ text: t("openInvites.noExplorersToJoin") }}
            collapsible
          />
          <ConnectionsList
            connectionType={ConnectionType.following}
            results={
              {
                ...results,
                data: results.data ? { entities: results.data.following } : undefined,
              } as QueryProfilesResults
            }
            userId={userId}
            context="sidePanel"
            endActionType="jumpIcon"
            emptyState={{
              text: t("profile.following.startFollowing"),
              cta: { onClick: () => navigate(paths.people), label: t("people.goToPeoplePage") },
            }}
            viewAll={{
              displayed: (results.data?.following?.totalCount ?? 0) > totalConnectionsLimitForSidePanel,
              onClick: () => setOpenConnectionsDialogType(ConnectionType.following),
            }}
            collapsible
          />
          {!!userId && <FollowerRecommendationsList userId={userId} />}
        </Stack>

        <ConditionalFeature name={FeatureFlag.onboardingChecklist}>
          {!!userId && onboardingButtonDismissed.value !== undefined && (
            <Collapse in={!!userId && !onboardingButtonDismissed.value}>
              <OnboardingFloatingButton userId={userId} handle={handle} />
            </Collapse>
          )}
        </ConditionalFeature>
      </SidePanelContainer>

      {!!openConnectionsDialogType && !!userId && (
        <ConnectionsListDialog
          connectionsType={openConnectionsDialogType}
          userId={userId}
          closeDialog={handleCloseDialog}
        />
      )}
    </>
  );
};

export default ConnectionsSidePanel;
