import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ReactComponent as PinBoldIcon } from "@src/assets/icons/pin-bold-icon.svg";
import { ReactComponent as PinIcon } from "@src/assets/icons/pin-icon.svg";
import { useVrContext } from "@src/context/vr/vr-context";
import usePinEntity from "@src/hooks/user/use-pin-entity.hook";
import useUnpinEntity from "@src/hooks/user/use-unpin-entity.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  entityId: string;
  userId?: string;
  pinned?: boolean;
  color?: "primary" | "secondary";
  size?: "small" | "large";
}

const PinButton: React.FC<Props> = ({ entityId, userId, pinned, color, size }) => {
  const theme = useTheme();
  const { showToast, showSignInToast } = useToast();
  const { t } = useTranslation();

  const { vrMode } = useVrContext();

  const { pinEntity, error: pinError } = usePinEntity();
  const { unpinEntity, error: unpinError } = useUnpinEntity();

  const [isPinned, setIsPinned] = useState(pinned);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pinError || unpinError) {
      setIsPinned(!isPinned);
      showToast(t("error.generic"), { variant: "error" });
      setLoading(false);
    }
  }, [pinError, unpinError]);

  const handleClick = async (): Promise<void> => {
    if (!userId) {
      showSignInToast("pin");
      return;
    }

    setLoading(true);
    setIsPinned(!isPinned);

    if (isPinned) {
      await unpinEntity({
        variables: { input: { entityId }, id: userId },
      });
    } else {
      await pinEntity({
        variables: { input: { entityId }, id: userId },
      });
    }

    setLoading(false);
  };

  return (
    <IconButton
      color={color}
      size={size}
      aria-label="pin"
      onClick={!loading ? () => void handleClick() : undefined}
      className={vrMode ? "hidden" : undefined}>
      {isPinned && !!userId ? (
        <PinBoldIcon color={theme.palette.error.main} />
      ) : (
        <Tooltip title={t("pins.tooltip")} arrow>
          <PinIcon />
        </Tooltip>
      )}
    </IconButton>
  );
};

export default PinButton;
