import React, { useId } from "react";

import ConnectionItem from "../connection-item/connection-item.component";
import Stack from "@mui/material/Stack";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { Profile } from "@src/common/graphql/generated/user.schema.graphql";
import { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import JumpToUserButton from "@src/components/connections/jump-to-user-button/jump-to-user-button.component";
import FollowButton from "@src/components/entities/entity-content/entity-action-buttons/follow-button/follow-button.component";
import { getUsername } from "@src/utils/get-user-properties.util";

interface Props {
  connection: Profile;
  endActionType: "followIcon" | "followButton" | "jumpIcon";
  userTitle?: string;
  currentUserId?: string;
  diffCount?: number;
  setDiffCount?: (diffCount: number) => void;
}

const ConnectionsListItem: React.FC<Props> = ({
  connection,
  endActionType,
  userTitle,
  currentUserId,
  diffCount,
  setDiffCount,
}) => {
  const id = useId();

  const getActionButton = (): JSX.Element | undefined => {
    if (endActionType === "followButton" || endActionType === "followIcon") {
      return (
        <FollowButton
          currentUserId={currentUserId}
          targetUserId={connection.userId}
          followingStatus={connection.followingStatus}
          updateOnClick={endActionType === "followIcon"}
          diffCount={diffCount}
          setDiffCount={setDiffCount}
          origin={endActionType === "followIcon" ? FollowOrigin.sidePanel : FollowOrigin.connectionsDialog}
          buttonType={endActionType === "followIcon" ? ButtonType.icon : ButtonType.text}
        />
      );
    } else if (endActionType === "jumpIcon" && !!connection.location?.url) {
      return <JumpToUserButton userId={connection.userId} fallbackLocation={connection.location.url} />;
    }

    return undefined;
  };

  return (
    <Stack id={`connections-list-item-${id}`} width="100%">
      <ConnectionItem
        userId={connection.userId}
        username={getUsername(connection)}
        handle={connection.handle}
        title={userTitle}
        image={connection.picture}
        customStatus={endActionType !== "followIcon" ? connection.customStatus : undefined}
        isOnline={endActionType !== "followIcon" ? connection.isOnline : undefined}
        location={endActionType === "jumpIcon" ? connection.location : undefined}
        displayOffline={endActionType === "jumpIcon"}
        action={getActionButton()}
      />
    </Stack>
  );
};

export default ConnectionsListItem;
