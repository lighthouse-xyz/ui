import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Container, Stack, Typography } from "@mui/material";
import { ReactComponent as LighthouseLogo } from "@src/assets/logos/lighthouse-logo-with-text.svg";
import { Role } from "@src/common/graphql/generated/user.schema.graphql";
import Alert from "@src/components/common/alert/alert.component";
import GodModeDetails from "@src/components/god-mode/god-mode-details/god-mode-details.component";
import SignInButton from "@src/components/user/sign-in-button/sign-in-button.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useErrorRedirect from "@src/hooks/utils/use-error-redirect.hook";

const GodMode: React.FC = () => {
  const { t } = useTranslation();

  const { forbiddenRedirect } = useErrorRedirect();
  const { connected, hasRole, loading } = useAuthContext();

  useEffect(() => {
    if (connected && !hasRole(Role.admin)) {
      forbiddenRedirect({ showError: true });
    }
  }, [connected]);

  return (
    <Container maxWidth="containedPage">
      <Stack spacing={6} alignItems="center" marginY={28}>
        <LighthouseLogo width="189px" height="40px" />
        <Alert
          color="warning"
          title={connected && hasRole(Role.admin) ? t("godMode.alert.currentlyIn") : t("godMode.alert.aboutToEnter")}
          content={<Typography variant="body2">{t("godMode.alert.warning")}</Typography>}
        />
        {!connected || !hasRole(Role.admin) ? (
          <SignInButton loading={loading || (connected && !hasRole(Role.admin))} width="100%" />
        ) : (
          <GodModeDetails />
        )}
      </Stack>
    </Container>
  );
};

export default GodMode;
