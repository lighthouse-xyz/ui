import React from "react";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useSwiper } from "swiper/react";

const SignOutButton: React.FC = () => {
  const { t } = useTranslation();

  const { logUserOut } = useAuthContext();

  const swiper = useSwiper();

  const handleSignOut = (): void => {
    logUserOut();
    swiper.slideTo(0);
  };

  return (
    <Button size="large" onClick={handleSignOut}>
      {t("cta.signOut")}
    </Button>
  );
};

export default SignOutButton;
