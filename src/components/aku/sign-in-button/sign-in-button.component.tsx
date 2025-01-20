import React from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { ButtonProps, Typography } from "@mui/material";
import { usePrivy } from "@privy-io/react-auth";
import { ReactComponent as ProfileIcon } from "@src/assets/icons/profile-circle-icon.svg";
import Alert from "@src/components/common/alert/alert.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import formatWalletAddress from "@src/utils/format-wallet-address.util";

interface Props extends ButtonProps {
  displayInfo?: "alert" | "string";
}

const SignInButton: React.FC<Props> = ({ displayInfo, ...props }) => {
  const { t } = useTranslation("aku");

  const { connected, loading: loadingCurrentProfile } = useAuthContext();
  const { login, ready, user } = usePrivy();

  const signInInfo =
    user?.email?.address ||
    user?.google?.email ||
    user?.twitter?.username ||
    user?.discord?.email ||
    formatWalletAddress(user?.wallet?.address, { firstCharacters: 2, lastCharacters: 3 });

  return !connected ? (
    <LoadingButton
      variant="outlined"
      color="secondary"
      size="large"
      {...props}
      onClick={ready ? login : undefined}
      loading={!ready || loadingCurrentProfile}>
      {t("cta.signIn")}
    </LoadingButton>
  ) : !displayInfo ? null : (
    <>
      {displayInfo === "alert" && (
        <Alert
          color="neutral"
          icon={<ProfileIcon />}
          content={signInInfo}
          sx={{ alignItems: "center", maxWidth: "fit-content", height: "48px" }}
        />
      )}
      {displayInfo === "string" && (
        <Typography variant="body1" alignSelf="center" noWrap maxWidth="100px">
          {signInInfo}
        </Typography>
      )}
    </>
  );
};

export default SignInButton;
