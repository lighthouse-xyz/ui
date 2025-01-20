import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import paths from "@src/common/paths";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import WalletAddress from "@src/components/user/wallet-address/wallet-address.component";
import { useVrContext } from "@src/context/vr/vr-context";
import useProfile from "@src/hooks/user/use-profile.hook";
import { getUsername } from "@src/utils/get-user-properties.util";

interface Props {
  walletAddress?: string;
  userId?: string;
}

const EntityAddedBy: React.FC<Props> = ({ walletAddress, userId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { vrMode } = useVrContext();
  const { getProfile, loading, data } = useProfile();

  const handleClick = (profileId: string): void => {
    !vrMode ? navigate(paths.profile.buildPath(profileId)) : undefined;
  };

  useEffect(() => {
    if (userId) {
      void getProfile({
        variables: { userId },
      });
    }
  }, [userId]);

  return (
    <>
      {userId || walletAddress ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="caption" color="text.secondary" minWidth="fit-content">
            {t("entity.addedBy")}
          </Typography>
          {userId ? (
            <>
              {loading ? (
                <LoadingIndicator size="20px" />
              ) : (
                <Stack direction="row" spacing={1} alignItems="center" textOverflow="ellipsis" overflow="hidden">
                  <Avatar
                    src={data?.profile.picture}
                    alt={getUsername(data?.profile ?? null)}
                    style={{ width: "24px", height: "24px", borderRadius: "8px" }}
                  />
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    noWrap
                    onClick={() => handleClick(data?.profile.handle ?? userId)}
                    sx={{ cursor: !vrMode ? "pointer" : undefined }}>
                    {getUsername(data?.profile ?? null)}
                  </Typography>
                </Stack>
              )}
            </>
          ) : walletAddress ? (
            <WalletAddress typography="caption" walletAddress={walletAddress} iconSize="16px" />
          ) : null}
        </Stack>
      ) : null}
    </>
  );
};

export default EntityAddedBy;
