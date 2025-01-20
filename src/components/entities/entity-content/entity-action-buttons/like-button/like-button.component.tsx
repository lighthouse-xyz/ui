import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as HeartBoldIcon } from "@src/assets/icons/heart-bold-icon.svg";
import { ReactComponent as HeartIcon } from "@src/assets/icons/heart-icon.svg";
import { useVrContext } from "@src/context/vr/vr-context";
import useLike from "@src/hooks/user/use-like.hook";
import useUnlike from "@src/hooks/user/use-unlike.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  entityId: string;
  userId?: string;
  liked?: boolean;
  color?: "primary" | "secondary";
  size?: "small" | "large";
}

const LikeButton: React.FC<Props> = ({ entityId, userId, liked, color, size }) => {
  const theme = useTheme();
  const { showToast, showSignInToast } = useToast();
  const { t } = useTranslation();

  const { vrMode } = useVrContext();

  const [isLiked, setIsLiked] = useState(liked);
  const [loading, setLoading] = useState(false);

  const { likeEntity, error: likeError } = useLike();
  const { unlikeEntity, error: unlikeError } = useUnlike();

  useEffect(() => {
    if (likeError || unlikeError) {
      setIsLiked(!isLiked);
      showToast(t("error.generic"), { variant: "error" });
      setLoading(false);
    }
  }, [likeError, unlikeError]);

  const handleClick = async (): Promise<void> => {
    if (!userId) {
      showSignInToast("like");
      return;
    }

    setLoading(true);
    setIsLiked(!isLiked);

    if (isLiked) {
      await unlikeEntity({
        variables: { input: { entityId }, id: userId },
      });
    } else {
      await likeEntity({
        variables: { input: { entityId }, id: userId },
      });
    }

    setLoading(false);
  };

  return (
    <IconButton
      color={color}
      size={size}
      aria-label="like"
      onClick={!loading ? () => void handleClick() : undefined}
      className={vrMode ? "hidden" : undefined}>
      {isLiked && !!userId ? <HeartBoldIcon color={theme.palette.error.main} /> : <HeartIcon />}
    </IconButton>
  );
};

export default LikeButton;
