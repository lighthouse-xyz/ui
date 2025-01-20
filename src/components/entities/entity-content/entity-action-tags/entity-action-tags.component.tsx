import React from "react";
import { useTranslation } from "react-i18next";

import { FirstButtonFromLeft, FirstIconFromRight, SecondIconFromRight } from "./entity-action-tags.style";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactComponent as HeartBoldIcon } from "@src/assets/icons/heart-bold-icon.svg";
import { ReactComponent as PinBoldIcon } from "@src/assets/icons/pin-bold-icon.svg";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FollowingStatus } from "@src/common/graphql/generated/user.schema.graphql";
import { Entity } from "@src/common/interfaces/entity.type";
import { useAuthContext } from "@src/context/auth/auth-context";

interface Props {
  entity: Entity;
  editMode?: boolean;
}

const EntityActionTags: React.FC<Props> = ({ entity, editMode }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const { profile } = useAuthContext();

  const isFutureEvent = entity.type === EntityType.event && !entity.past && !entity.live;

  return !!profile && !editMode ? (
    <>
      {entity.interested && !entity.live && (
        <FirstButtonFromLeft>
          <Button variant="containedDark" size="small">
            {t("interested.label")}
          </Button>
        </FirstButtonFromLeft>
      )}
      {(entity.followingStatus === FollowingStatus.following || entity.followingStatus === FollowingStatus.friend) && (
        <FirstButtonFromLeft>
          <Button variant="containedDark" size="small">
            {t("cta.follow", { context: entity.followingStatus })}
          </Button>
        </FirstButtonFromLeft>
      )}
      {entity.pinned &&
        (entity.type !== EntityType.member && (!isFutureEvent || entity.liked) ? (
          <SecondIconFromRight>
            <PinBoldIcon color={theme.palette.error.main} />
          </SecondIconFromRight>
        ) : (
          <FirstIconFromRight>
            <PinBoldIcon color={theme.palette.error.main} />
          </FirstIconFromRight>
        ))}
      {entity.liked && (
        <FirstIconFromRight>
          <HeartBoldIcon color={theme.palette.error.main} />
        </FirstIconFromRight>
      )}
    </>
  ) : null;
};

export default EntityActionTags;
