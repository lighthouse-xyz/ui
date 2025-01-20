import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import { useVrContext } from "@src/context/vr/vr-context";
import useInterestedInEvent from "@src/hooks/user/use-interested-in-event.hook";
import useUninterestedInEvent from "@src/hooks/user/use-uninterested-in-event.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface Props {
  entityId: string;
  userId?: string;
  interested?: boolean;
  btnColor?: "primary" | "secondary";
  btnSize: "small" | "large";
}

const InterestedButton: React.FC<Props> = ({ entityId, userId, interested, btnColor, btnSize }) => {
  const { showToast, showSignInToast } = useToast();
  const { t } = useTranslation();

  const { vrMode } = useVrContext();

  const [isInterested, setIsInterested] = useState(interested);
  const [loading, setLoading] = useState(false);

  const { interestedInEvent, error: interestedError } = useInterestedInEvent();
  const { uninterestedInEvent, error: uninterestedError } = useUninterestedInEvent();

  useEffect(() => {
    if (interestedError || uninterestedError) {
      setIsInterested(!isInterested);
      showToast(t("error.generic"), { variant: "error" });
      setLoading(false);
    }
  }, [interestedError, uninterestedError]);

  const handleClick = async (): Promise<void> => {
    if (!userId) {
      showSignInToast("interested");
      return;
    }

    setLoading(true);
    setIsInterested(!isInterested);

    if (isInterested) {
      await uninterestedInEvent({
        variables: { input: { entityId }, id: userId },
      });
    } else {
      await interestedInEvent({
        variables: { input: { entityId }, id: userId },
      });
    }

    setLoading(false);
  };

  return (
    <Button
      variant={isInterested && !!userId ? "containedDark" : "outlined"}
      color={btnColor}
      size={btnSize}
      disableElevation
      onClick={!loading ? () => void handleClick() : undefined}
      className={vrMode ? "hidden" : undefined}>
      {t("interested.label")}
    </Button>
  );
};

export default InterestedButton;
