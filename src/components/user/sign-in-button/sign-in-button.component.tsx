import React from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { usePrivy } from "@privy-io/react-auth";
import { useVrContext } from "@src/context/vr/vr-context";

interface Props {
  width?: string;
  loading?: boolean;
}

const SignInButton: React.FC<Props> = ({ width, loading = false }) => {
  const { t } = useTranslation();

  const { vrMode } = useVrContext();
  const { ready, login } = usePrivy();

  return (
    <LoadingButton
      variant="contained"
      size="large"
      sx={{ minWidth: "140px", width }}
      onClick={ready ? login : undefined}
      loading={loading}
      className={vrMode ? "hidden" : undefined}>
      {t("cta.signIn")}
    </LoadingButton>
  );
};

export default SignInButton;
