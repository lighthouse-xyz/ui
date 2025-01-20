import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { Container, Stack, Typography } from "@mui/material";
import { Profile, Role } from "@src/common/graphql/generated/user.schema.graphql";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import HowDoesItWork from "@src/components/user/lightkeeper-stats/how-does-it-work/how-does-it-work.component";
import HowYoureDoing from "@src/components/user/lightkeeper-stats/how-youre-doing/how-youre-doing.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useErrorRedirect from "@src/hooks/utils/use-error-redirect.hook";
import useFeatureFlag, { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";

interface Props {
  godMode?: boolean;
}

const LightkeeperStats: React.FC<Props> = ({ godMode }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isFeatureEnabled } = useFeatureFlag();

  const { connected, profile: currentUserProfile, loading: loadingCurrentUser, hasRole } = useAuthContext();
  const { forbiddenRedirect } = useErrorRedirect();

  const profileFromState = (location.state as { profile: Profile } | undefined)?.profile;
  const lightKeeperDashboardAvailable = isFeatureEnabled(FeatureFlag.lightkeeperDashboard);
  const isLightkeeper = lightKeeperDashboardAvailable && hasRole(Role.lightkeeper);
  const isAdmin = godMode && hasRole(Role.admin);
  const profile = profileFromState ?? currentUserProfile;

  useEffect(() => {
    if (connected && !(isLightkeeper || isAdmin)) {
      forbiddenRedirect({ showError: lightKeeperDashboardAvailable });
    }
  }, [connected]);

  return (
    <Container maxWidth="containedPage" disableGutters>
      {!!profile && (isLightkeeper || isAdmin) && !loadingCurrentUser && (
        <Stack spacing={8}>
          <Typography variant="h5">{t("lightkeeperStats.label")}</Typography>
          <HowDoesItWork userIdOrHandle={profile.handle || profile.userId} />
          <HowYoureDoing userId={profile.userId} godMode={godMode} />
        </Stack>
      )}

      {loadingCurrentUser && <LoadingIndicator size="70px" />}
    </Container>
  );
};

export default LightkeeperStats;
