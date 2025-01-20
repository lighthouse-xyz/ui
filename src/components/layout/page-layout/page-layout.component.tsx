import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router-dom";

import ConnectionsSidePanel from "../connections-side-panel/connections-side-panel.component";
import CookiesConsentBanner from "../cookies-consent-banner/cookies-consent-banner.component";
import Footer from "../footer/footer.component";
import LeftDrawer from "../left-drawer/left-drawer.component";
import TopAppBar from "../top-app-bar/top-app-bar.component";
import VrAlert from "../vr-alert/vr-alert.component";
import { FooterContainer, MiddleContainer, PageContainer } from "./page-layout.style";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import ClaimInviteAvatarDialog from "@src/components/onboarding/claim-invite-avatar-dialog/claim-invite-avatar-dialog.component";
import OnboardingDialog from "@src/components/onboarding/onboarding-dialog/onboarding-dialog.component";
import SignInOnboardingDialog from "@src/components/onboarding/sign-in-onboarding-dialog/sign-in-onboarding-dialog.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useUserStateContext } from "@src/context/user-state/user-state-context";
import { useVrContext } from "@src/context/vr/vr-context";
import { useLazyGetUserOnboardingState } from "@src/hooks/user/use-get-user-onboarding-state.hook";
import useGetUserState from "@src/hooks/user/use-get-user-state.hook";
import useSetUserState from "@src/hooks/user/use-set-user-state.hook";
import useFeatureFlag, { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";
import useLeftDrawer from "@src/hooks/utils/use-left-drawer.hook";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "@src/utils/local-storage.util";

const PageLayout: React.FC = () => {
  const { isFeatureEnabled } = useFeatureFlag();
  const sessionCookie = "connect.sid";
  const showNewOnboarding = isFeatureEnabled(FeatureFlag.newOnboarding);
  const showOldOnboarding = isFeatureEnabled(FeatureFlag.oldOnboarding);

  const [cookies] = useCookies([sessionCookie]);
  const { vrMode } = useVrContext();
  const { connected, profile, loading } = useAuthContext();
  const { fullWidth: leftDrawerFullWidth } = useLeftDrawer();
  const { claimInviteAvatarDialogDismissed } = useUserStateContext();

  const { getUserState } = useGetUserState();
  const { setUserState } = useSetUserState();
  const { getOnboardingState } = useLazyGetUserOnboardingState();

  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState(false);
  const [isSignInOnboardingDialogOpen, setIsSignInOnboardingDialogOpen] = useState(false);
  const [isClaimInviteAvatarDialogOpen, setIsClaimInviteAvatarDialogOpen] = useState(false);

  const handleOnboardingClose = (): void => {
    setIsOnboardingDialogOpen(false);
    setLocalStorage<boolean>(localStorageKeys.onboarding, false);
  };

  const handleSignInOnboardingClose = (): void => {
    setIsSignInOnboardingDialogOpen(false);
    const element = document.getElementsByClassName("onboarding-btn")[0];
    if (element instanceof HTMLElement) {
      element.click();
    }
    if (profile) {
      void setUserState({ variables: { userId: profile.userId, input: { onboardingCompleted: true } } });
    }
  };

  const handleClaimInviteAvatarClose = (): void => {
    setIsClaimInviteAvatarDialogOpen(false);
    claimInviteAvatarDialogDismissed.setValue(true);
  };

  useEffect(() => {
    if (showNewOnboarding) {
      if (profile && !vrMode) {
        void getUserState({
          variables: { userId: profile.userId },
          onCompleted: userStateData => {
            if (!userStateData.userState.onboardingCompleted) {
              setIsSignInOnboardingDialogOpen(true);
            } else if (!claimInviteAvatarDialogDismissed.value) {
              void getOnboardingState({
                variables: { userId: profile.userId },
                onCompleted: onboardingStateData => {
                  const inviteFriendCompleted = onboardingStateData.userOnboardingState.stepInviteFriendAt;
                  const claimAvatarDialogDismissed =
                    userStateData.userState.frontendState?.claimInviteAvatarDialogDismissed;
                  if (inviteFriendCompleted && !claimAvatarDialogDismissed) {
                    setIsClaimInviteAvatarDialogOpen(true);
                  }
                },
              });
            }
          },
        });
      }
    } else {
      if (getLocalStorage<boolean>(localStorageKeys.onboarding, !vrMode)) {
        setIsOnboardingDialogOpen(true);
      }
    }
  }, [connected]);

  return (
    <>
      {(!!cookies[sessionCookie] || !loading) && (
        <PageContainer>
          <Container maxWidth={vrMode ? "xlVr" : "xl"}>
            <TopAppBar />
            <Stack direction="row">
              <LeftDrawer />
              <MiddleContainer marginLeft={leftDrawerFullWidth}>
                <Box>
                  <Toolbar />
                  <VrAlert />
                  <Outlet />
                </Box>
                <FooterContainer paddingTop={20}>
                  <Footer />
                </FooterContainer>
              </MiddleContainer>
              {!vrMode && <ConnectionsSidePanel userId={profile?.userId} handle={profile?.handle} />}
            </Stack>
          </Container>
          <CookiesConsentBanner />
        </PageContainer>
      )}

      {showNewOnboarding
        ? isSignInOnboardingDialogOpen && <SignInOnboardingDialog onClose={handleSignInOnboardingClose} />
        : showOldOnboarding && isOnboardingDialogOpen && <OnboardingDialog onClose={handleOnboardingClose} />}

      {isClaimInviteAvatarDialogOpen && !!profile && (
        <ClaimInviteAvatarDialog userId={profile.userId} onClose={handleClaimInviteAvatarClose} />
      )}
    </>
  );
};

export default PageLayout;
