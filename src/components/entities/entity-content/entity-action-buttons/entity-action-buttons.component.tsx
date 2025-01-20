import React, { useEffect, useRef, useState } from "react";

import DeleteButton from "./delete-button/delete-button.component";
import EditButton from "./edit-button/edit-button.component";
import FollowButton from "./follow-button/follow-button.component";
import InterestedButton from "./interested-button/interested-button.component";
import JumpButton from "./jump-button/jump-button.component";
import LikeButton from "./like-button/like-button.component";
import MarketplaceButton from "./marketplace-button/marketplace-button.component";
import MoreOptionsDropdownMenu from "./more-options-dropdown-menu/more-options-dropdown-menu.component";
import PinButton from "./pin-button/pin-button.component";
import ReportButton from "./report-button/report-button.component";
import ShareButton from "./share-button/share-button.component";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import { useAuthContext } from "@src/context/auth/auth-context";

interface Props {
  entity: Entity;
  context: "card" | "dialog";
  editMode?: boolean;
}

const EntityActionButtons: React.FC<Props> = ({ entity, context, editMode = false }) => {
  const secondaryActionsContainer = useRef<HTMLDivElement>(null);
  const [overflowSecondaryActions, setOverflowSecondaryActions] = useState(true);

  const { profile, connected } = useAuthContext();

  const isPlace = entity.type === EntityType.parcel || entity.type === EntityType.estate;
  const isFutureEvent = entity.type === EntityType.event && !entity.past && !entity.live;

  const btnColor = context === "dialog" ? "primary" : "secondary";
  const btnSize = context === "dialog" ? "large" : "small";

  const displayEditButtons = editMode && context === "card" && connected;

  useEffect(() => {
    const { current } = secondaryActionsContainer;
    if (current) setOverflowSecondaryActions(current.offsetWidth < current.scrollWidth);
  }, [secondaryActionsContainer.current, connected, entity]);

  const getInterestedButton = (): JSX.Element => {
    return (
      <InterestedButton
        userId={profile?.userId}
        entityId={entity.entityId}
        interested={entity.interested}
        btnColor={btnColor}
        btnSize={btnSize}
      />
    );
  };

  const getMainActions = (): JSX.Element | undefined => {
    if (displayEditButtons) {
      return <DeleteButton entity={entity} btnColor={btnColor} />;
    }

    if (entity.live || isPlace) {
      return (
        <>
          <JumpButton entity={entity} size={btnSize} />
          {context === "dialog" && isPlace && (
            <MarketplaceButton
              entityId={entity.entityId}
              disabled={!entity.canViewMarketplace}
              color={btnColor}
              size={btnSize}
            />
          )}
          {context === "dialog" && entity.live && getInterestedButton()}
        </>
      );
    }
    if (entity.type === EntityType.member) {
      return (
        <FollowButton
          currentUserId={profile?.userId}
          targetUserId={entity.entityId}
          followingStatus={entity.followingStatus}
          size={btnSize}
          origin={FollowOrigin.entityCard}
          updateOnClick
        />
      );
    }
    if (entity.type === EntityType.event) {
      const isRecurringButNotLastInstance = entity.isRecurring && entity.latestFinishAt !== entity.nextFinishAt;
      return (
        <>
          {context === "dialog" && <JumpButton entity={entity} size={btnSize} />}
          {(entity.interested || (!entity.past && (!entity.live || isRecurringButNotLastInstance))) &&
            getInterestedButton()}
        </>
      );
    }

    return undefined;
  };

  const getSecondaryActions = (): JSX.Element => {
    if (displayEditButtons) {
      return <EditButton entity={entity} btnColor={btnColor} />;
    }

    const defaultProps: { entityId: string; color?: "primary" | "secondary"; size?: "small" | "large" } = {
      entityId: entity.entityId,
      color: btnColor,
      size: btnSize,
    };

    return (
      <>
        {(entity.type === EntityType.member || (context === "dialog" && !overflowSecondaryActions)) && (
          <ShareButton entityType={entity.type} {...defaultProps} entityId={entity.handle ?? entity.entityId} />
        )}

        {entity.type !== EntityType.member && (
          <PinButton userId={profile?.userId} pinned={entity.pinned} {...defaultProps} />
        )}

        {entity.type !== EntityType.member && (!isFutureEvent || entity.liked) && (
          <LikeButton userId={profile?.userId} liked={entity.liked} {...defaultProps} />
        )}

        {context === "dialog" && connected && !overflowSecondaryActions && !editMode && (
          <ReportButton {...defaultProps} />
        )}

        {context === "dialog" && connected && (editMode || overflowSecondaryActions) && (
          <MoreOptionsDropdownMenu
            entity={entity}
            editMode={editMode}
            includeShareToEditOptions={overflowSecondaryActions}
          />
        )}
      </>
    );
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={2}>
        {getMainActions()}
      </Stack>

      <Box ref={secondaryActionsContainer} component="div" overflow="hidden">
        <Stack direction="row" alignItems="center">
          {getSecondaryActions()}
        </Stack>
      </Box>
    </Stack>
  );
};

export default EntityActionButtons;
