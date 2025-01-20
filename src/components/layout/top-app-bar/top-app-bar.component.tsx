import React from "react";
import { useNavigate } from "react-router-dom";

import { AppBarContainer } from "./top-app-bar.style";
import { useTheme } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { ReactComponent as LighthouseLogo } from "@src/assets/logos/lighthouse-logo.svg";
import { ReactComponent as LighthouseText } from "@src/assets/logos/lighthouse-text.svg";
import paths from "@src/common/paths";
import { pageLayout } from "@src/common/styles/style.const";
import JumpNowDropdownMenu from "@src/components/entities/jump-now-dropdown-menu/jump-now-dropdown-menu.component";
import SearchBar from "@src/components/entities/search-bar/search-bar.component";
import SignInButton from "@src/components/user/sign-in-button/sign-in-button.component";
import UserSidebar from "@src/components/user/user-sidebar/user-sidebar.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useVrContext } from "@src/context/vr/vr-context";
import useLeftDrawer from "@src/hooks/utils/use-left-drawer.hook";
import { getUsername } from "@src/utils/get-user-properties.util";

const TopAppBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { profile, loading } = useAuthContext();
  const { vrMode } = useVrContext();
  const { fullWidth: leftDrawerFullWidth, collapsed: leftDrawerCollapsed } = useLeftDrawer();

  return (
    <AppBarContainer minwidth={vrMode ? "628px" : "920px"}>
      <Container maxWidth={vrMode ? "lgVr" : "lg"} disableGutters>
        <Toolbar>
          <Grid container columnSpacing={10} flexWrap="nowrap" alignItems="center">
            <Grid item width={leftDrawerFullWidth}>
              <Stack
                direction="row"
                alignItems="center"
                justifyItems="center"
                paddingLeft={2}
                paddingRight={pageLayout.drawerPaddingX}
                sx={{ cursor: "pointer" }}>
                <LighthouseLogo width="40px" height="40px" onClick={() => navigate(paths.home)} />
                <Collapse in={!leftDrawerCollapsed} orientation="horizontal" sx={{ height: "32px" }}>
                  <LighthouseText
                    width="149px"
                    height="40px"
                    color={theme.palette.text.primary}
                    onClick={() => navigate(paths.home)}
                  />
                </Collapse>
              </Stack>
            </Grid>
            <Grid item xs>
              <SearchBar />
            </Grid>
            <Grid item xs="auto">
              <Stack direction="row" spacing={6}>
                <JumpNowDropdownMenu />
              </Stack>
            </Grid>

            {!vrMode && (
              <Grid item width={pageLayout.drawerFullWidth} paddingRight={3}>
                {profile ? (
                  <UserSidebar
                    userId={profile.userId}
                    username={getUsername(profile)}
                    handle={profile.handle}
                    walletAddress={profile.walletAddress}
                    image={profile.picture as string}
                    customStatus={profile.customStatus}
                    isOnline={profile.isOnline}
                  />
                ) : (
                  <Stack paddingLeft={pageLayout.drawerPaddingX} maxWidth={pageLayout.drawerWidth}>
                    <SignInButton loading={loading} />
                  </Stack>
                )}
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBarContainer>
  );
};

export default TopAppBar;
