import React from "react";
import { useTranslation } from "react-i18next";

import LoadingButton from "@mui/lab/LoadingButton";
import { Tooltip } from "@mui/material";
import { ReactComponent as JumpIcon } from "@src/assets/icons/jump-icon.svg";
import useJumpToUser from "@src/hooks/discovery/use-jump-to-user.hook";

interface Props {
  userId: string;
  fallbackLocation: string;
}

const JumpToUserButton: React.FC<Props> = ({ userId, fallbackLocation }) => {
  const { getJumpToUserLocation, loading } = useJumpToUser(userId);
  const { t } = useTranslation();

  const handleClick = (): void => {
    void getJumpToUserLocation({
      onCompleted: data => window.open(data.jumpToUser.url),
      onError: () => window.open(fallbackLocation),
    });
  };

  return (
    <Tooltip title={t("cta.join")} arrow>
      <LoadingButton className="action-button-connection-item" loading={loading} color="success" onClick={handleClick}>
        <JumpIcon />
      </LoadingButton>
    </Tooltip>
  );
};

export default JumpToUserButton;
