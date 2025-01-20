import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApolloClient } from "@apollo/client";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { ReactComponent as FollowIcon } from "@src/assets/icons/follow-icon.svg";
import { FollowOrigin } from "@src/common/enums/track-events.enum";
import { FollowingStatus } from "@src/common/graphql/generated/user.schema.graphql";
import { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import useFollow from "@src/hooks/user/use-follow.hook";
import { getConnectionsSidePanelConnectedQueries } from "@src/hooks/user/use-get-connections-side-panel.hook";
import useUnfollow from "@src/hooks/user/use-unfollow.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  currentUserId?: string;
  targetUserId: string;
  followingStatus?: FollowingStatus;
  updateOnClick?: boolean;
  buttonType?: ButtonType;
  size?: "small" | "medium" | "large";
  diffCount?: number;
  setDiffCount?: (diffCount: number) => void;
  origin: FollowOrigin;
}

const FollowButton: React.FC<Props> = ({
  currentUserId,
  targetUserId,
  followingStatus,
  updateOnClick = false,
  buttonType = ButtonType.text,
  size = "medium",
  diffCount,
  setDiffCount,
  origin,
}) => {
  const { showToast, showSignInToast } = useToast();
  const { t } = useTranslation();
  const client = useApolloClient();

  const isFollowingOrIsFriend =
    followingStatus === FollowingStatus.following || followingStatus === FollowingStatus.friend;
  const diffCountDefined = diffCount !== undefined && !!setDiffCount;

  const [loading, setLoading] = useState(false);

  const { follow, error: followError } = useFollow(origin);
  const { unfollow, error: unfollowError } = useUnfollow();

  useEffect(() => {
    if (followError || unfollowError) {
      showToast(t("error.interested"), { variant: "error" });
      setLoading(false);
    }
  }, [followError, unfollowError]);

  const refetchQueries = (): void => {
    if (updateOnClick && currentUserId) {
      void client.refetchQueries({
        include: [getConnectionsSidePanelConnectedQueries],
      });
    }
  };

  const handleClick = async (): Promise<void> => {
    if (!currentUserId) {
      showSignInToast("follow");
      return;
    }

    setLoading(true);

    if (isFollowingOrIsFriend) {
      await unfollow({
        variables: { input: { targetUserId }, id: currentUserId },
        onCompleted: () => {
          diffCountDefined && setDiffCount(diffCount - 1);
          refetchQueries();
        },
      });
    }

    if (!isFollowingOrIsFriend) {
      await follow({
        variables: { input: { targetUserId }, id: currentUserId },
        onCompleted: () => {
          diffCountDefined && setDiffCount(diffCount + 1);
          refetchQueries();
        },
      });
    }

    setLoading(false);
  };

  return followingStatus !== FollowingStatus.self ? (
    buttonType === ButtonType.text ? (
      <Button
        variant={isFollowingOrIsFriend && !!currentUserId ? "containedDark" : "contained"}
        size={size}
        onClick={!loading ? () => void handleClick() : undefined}>
        {t("cta.follow", { context: followingStatus })}
      </Button>
    ) : !isFollowingOrIsFriend ? (
      <IconButton
        color="primary"
        size={size}
        onClick={!loading ? () => void handleClick() : undefined}
        className="action-button-connection-item">
        <FollowIcon />
      </IconButton>
    ) : null
  ) : null;
};

export default FollowButton;
