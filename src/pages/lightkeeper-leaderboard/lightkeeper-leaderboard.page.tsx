import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Role } from "@src/common/graphql/generated/user.schema.graphql";
import BackButton from "@src/components/common/back-button/back-button.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import LeaderboardTable from "@src/components/user/lightkeeper-stats/leaderboard-table/leaderboard-table.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useErrorRedirect from "@src/hooks/utils/use-error-redirect.hook";
import useFeatureFlag, { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";

interface Props {
  godMode?: boolean;
}

const LightkeeperLeaderboard: React.FC<Props> = ({ godMode }) => {
  const location = useLocation();
  const { isFeatureEnabled } = useFeatureFlag();

  const { connected, profile: currentUserProfile, loading: loadingCurrentUser, hasRole } = useAuthContext();
  const { forbiddenRedirect } = useErrorRedirect();

  const userIdFromState = (location.state as { userId: string } | undefined)?.userId;
  const lightKeeperDashboardAvailable = isFeatureEnabled(FeatureFlag.lightkeeperDashboard);
  const isLightkeeper = lightKeeperDashboardAvailable && hasRole(Role.lightkeeper);
  const isAdmin = godMode && hasRole(Role.admin);
  const userId = userIdFromState ?? currentUserProfile?.userId;

  useEffect(() => {
    if (connected && !(isLightkeeper || isAdmin)) {
      forbiddenRedirect({ showError: lightKeeperDashboardAvailable });
    }
  }, [connected]);

  return (
    <Container maxWidth="containedPage">
      {!!userId && (isLightkeeper || isAdmin) && !loadingCurrentUser && (
        <>
          <Box alignSelf="flex-start" paddingBottom={9}>
            <BackButton />
          </Box>

          <LeaderboardTable userId={userId} />
        </>
      )}

      {loadingCurrentUser && <LoadingIndicator size="70px" />}
    </Container>
  );
};

export default LightkeeperLeaderboard;
