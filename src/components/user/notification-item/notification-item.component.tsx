import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

import { Typography, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FollowOrigin } from "@src/common/enums/origin.enum";
import { World } from "@src/common/graphql/generated/discovery.schema.graphql";
import {
  ActivityVerb,
  DeletedObject,
  FollowingStatus,
  Notification,
} from "@src/common/graphql/generated/user.schema.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import paths from "@src/common/paths";
import { borderRadius } from "@src/common/styles/style.const";
import ImageAvatar from "@src/components/common/image-avatar/image-avatar.component";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import FollowButton from "@src/components/entities/entity-content/entity-action-buttons/follow-button/follow-button.component";
import JumpButton from "@src/components/entities/entity-content/entity-action-buttons/jump-button/jump-button.component";
import NotificationItemMenu from "@src/components/user/notification-item-menu/notification-item-menu.component";
import { getUsername } from "@src/utils/get-user-properties.util";
import { getDeletedObjectOriginalType, NotificationsTypename } from "@src/utils/notifications.util";

interface Props {
  data: Notification;
  userId: string;
}

type Who = {
  name: string;
  url?: string;
  avatar: JSX.Element;
};

type What = {
  id: string;
  subject?: string;
  description?: string;
  url?: string;
  where?: string;
  fullEntity?: Entity;
};

// eslint-disable-next-line max-lines-per-function, complexity
const NotificationItem: React.FC<Props> = ({ data, userId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [hover, setHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { verb, actor, object, isRead, time } = data;

  const isAlreadyFollowingActor =
    actor.__typename === NotificationsTypename.profile &&
    (actor.followingStatus === FollowingStatus.friend || actor.followingStatus === FollowingStatus.following);
  const showFollowButton =
    actor.__typename === NotificationsTypename.profile && verb === ActivityVerb.follow && !isAlreadyFollowingActor;
  const showJumpButton = object.__typename !== NotificationsTypename.deletedObject && verb === ActivityVerb.goLive;

  const handleDropdownToggleChange = (open: boolean): void => {
    setHover(false);
    setIsMenuOpen(open);
  };

  const getBgColor = (): string | undefined => {
    if (isRead) {
      if (isMenuOpen || hover) {
        return palette.action.hover;
      }
      return "transparent";
    } else {
      if (isMenuOpen || hover) {
        return palette.primary.shades?.["12p"];
      }
      return palette.primary.shades?.["4p"];
    }
  };

  const getWho = (): Who => {
    if (actor.__typename === NotificationsTypename.profile)
      return {
        avatar: (
          <ImageAvatar
            image={actor.picture}
            name={getUsername(actor)}
            userId={actor.userId}
            size="smallMedium"
            type="user"
          />
        ),
        name: getUsername(actor),
        url: paths.profile.buildPath(actor.handle || actor.userId),
      };

    // In an event-go-live notification, the event is also the actor
    if (actor.__typename === NotificationsTypename.event)
      return {
        avatar: <ImageAvatar image={actor.image} name={actor.name} size="smallMedium" type="entity" />,
        name: "",
        url: paths.entityDetails.buildPath(actor.entityId),
      };

    // actor is type deletedObject
    return {
      avatar: (
        <ImageAvatar
          size="smallMedium"
          type={
            getDeletedObjectOriginalType(actor as DeletedObject) === NotificationsTypename.profile ? "user" : "entity"
          }
        />
      ),
      name:
        getDeletedObjectOriginalType(actor as DeletedObject) === NotificationsTypename.profile
          ? t("notifications.items.deleted_Profile")
          : "",
    };
  };

  const getWhat = (): What => {
    let subject,
      url,
      description,
      where,
      id = "";
    let fullEntity: Entity | undefined = undefined;
    switch (verb) {
      case ActivityVerb.create:
        subject = t("notifications.items.create", {
          context:
            object.__typename !== NotificationsTypename.deletedObject
              ? object.__typename
              : getDeletedObjectOriginalType(object),
        });

        break;
      case ActivityVerb.follow:
        subject = t("notifications.items.followedYou");
        break;
      case ActivityVerb.interested:
        if (
          actor.__typename === NotificationsTypename.profile &&
          object.__typename === NotificationsTypename.event &&
          object.ownerUser === userId
        ) {
          subject = t("notifications.items.interestedInYourEvent");
        } else {
          subject = t("notifications.items.interestedInEvent");
        }
        break;
      case ActivityVerb.goLive:
        subject = t("notifications.items.goLive");
        break;
      default:
        break;
    }

    switch (object.__typename) {
      case NotificationsTypename.profile:
        id = object.userId;
        url = paths.profile.buildPath(id);
        break;
      case NotificationsTypename.event:
      case NotificationsTypename.parcel:
      case NotificationsTypename.estate:
        id = object.entityId;
        url = paths.entityDetails.buildPath(id);
        description = object.name;
        where = object.world;
        fullEntity = object as Entity;
        break;
      case NotificationsTypename.deletedObject:
        id = object.entityId;
        url = "";
        description = t("notifications.items.deleted", {
          context: getDeletedObjectOriginalType(object),
        });
        where = "";
        break;
      default:
        break;
    }

    return { subject, url, description, where, id, fullEntity };
  };

  const who = getWho();
  const what = getWhat();

  return (
    <Stack
      data-testid="notification-item"
      direction="row"
      spacing={3}
      p={4}
      paddingBottom={2}
      width="100%"
      bgcolor={getBgColor()}
      borderRadius={borderRadius.default}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {who.avatar}

      <Stack spacing={1} width="100%" overflow="hidden" paddingBottom={2}>
        <Stack direction="row" spacing={1} width="100%" alignItems="center" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            paddingY={1}
            width="100%"
            textOverflow="ellipsis"
            overflow="hidden">
            {(actor.__typename === NotificationsTypename.profile ||
              actor.__typename === NotificationsTypename.deletedObject) && (
              <Typography
                variant="h8"
                noWrap
                color="text.primary"
                sx={{ cursor: who.url ? "pointer" : "default" }}
                onClick={() => !!who.url && navigate(who.url)}>
                {who.name}
              </Typography>
            )}
            <Typography variant="body1" noWrap color="text.primary" minWidth="fit-content">
              {what.subject}
            </Typography>
          </Stack>
          {/* @TODO: Replace with this line when deleting duplicates issue is solved
          {(hover || isMenuOpen) && ( */}
          {(hover || isMenuOpen) && !isRead && (
            <NotificationItemMenu
              isRead={isRead}
              handleDropdownToggleChange={handleDropdownToggleChange}
              notification={data}
            />
          )}
        </Stack>

        <Stack spacing={2} width="100%">
          {object.__typename !== NotificationsTypename.profile && (
            <Stack
              direction="row"
              spacing={5}
              width="100%"
              justifyContent="space-between"
              textOverflow="ellipsis"
              overflow="hidden">
              <Typography
                typography="subtitle2"
                noWrap
                color={what.url ? "text.primary" : "text.secondary"}
                sx={{ cursor: "pointer" }}
                onClick={what.url ? () => navigate(paths.entityDetails.buildPath(what.id)) : undefined}>
                {what.description}
              </Typography>
              <Stack>
                <WorldLogo world={World[what.where as keyof typeof World]} />
              </Stack>
            </Stack>
          )}

          <Typography typography="caption" color="text.secondary">
            {time && <ReactTimeAgo date={new Date(time)} locale="en-US" />}
          </Typography>

          {showFollowButton ? (
            <FollowButton
              currentUserId={userId}
              targetUserId={actor.userId}
              followingStatus={actor.followingStatus}
              updateOnClick
              origin={FollowOrigin.notifications}
              size="small"
            />
          ) : showJumpButton && what.fullEntity ? (
            <JumpButton entity={what.fullEntity} size="small" />
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NotificationItem;
