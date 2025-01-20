import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import ClaimHandleHeader from "../../claim-handle-header/claim-handle-header.component";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import SignInButton from "@src/components/user/sign-in-button/sign-in-button.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useSwiper } from "swiper/react";

const SignInStep: React.FC = () => {
  const { t } = useTranslation();

  const { connected, loading } = useAuthContext();
  const swiper = useSwiper();

  useEffect(() => {
    if (connected && swiper.activeIndex === 0) swiper.slideTo(1);
  }, [connected]);

  return (
    <Stack spacing={22} alignItems="center" textAlign="center">
      <ClaimHandleHeader title={t("handle.claim.label")} subtitle={t("handle.claim.lock")} />
      <Stack spacing={4} alignItems="center">
        <Typography variant="body1">{t("handle.signIn")}</Typography>
        <SignInButton width="216px" loading={loading} />
      </Stack>
    </Stack>
  );
};

export default SignInStep;
