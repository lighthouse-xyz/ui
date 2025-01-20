import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { PageContainer } from "./landing-layout.style";
import LandingTopBar from "./landing-top-bar/landing-top-bar.component";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import landingBgImage from "@src/assets/images/landing-bg-image.webp";
import landingMobileBgImage from "@src/assets/images/landing-mobile-bg-image.png";
import paths from "@src/common/paths";
import Footer from "@src/components/layout/footer/footer.component";
import { useAuthContext } from "@src/context/auth/auth-context";

const LandingLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onHomePage = location.pathname === paths.home;

  const { connected, loading } = useAuthContext();

  useEffect(() => {
    if (connected && !isMobile) {
      navigate(paths.home);
    }
  }, [connected]);

  const getBgImage = (): string => {
    if (onHomePage) {
      return landingMobileBgImage;
    }
    return landingBgImage;
  };

  return !loading && (!connected || isMobile) ? (
    <>
      <Stack>
        <PageContainer bgimage={getBgImage()} color="common.white" padding={{ xs: 10, smMd: 14 }}>
          <LandingTopBar />
          <Box marginTop={25}>
            <Outlet />
          </Box>
        </PageContainer>
        <Footer />
      </Stack>
    </>
  ) : null;
};

export default LandingLayout;
