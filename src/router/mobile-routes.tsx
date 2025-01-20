import React from "react";
import { Route, Routes } from "react-router-dom";

import paths from "../common/paths";
import LandingLayout from "../components/layout/landing-layout/landing-layout.component";
import AkuChapter from "../pages/aku-chapter/aku-chapter.page";
import AkuLanding from "../pages/aku-landing/aku-landing.page";
import ClaimHandle from "../pages/claim-handle/claim-handle.page";
import HomeMobile from "../pages/home-mobile/home-mobile.page";
import Landing from "../pages/landing/landing.page";

const MobileRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path={paths.home} element={<HomeMobile />} />
        <Route path="*" element={<Landing />} />
      </Route>
      <Route path={paths.claimHandle} element={<ClaimHandle />} />
      <Route path={paths.akuLanding} element={<AkuLanding />} />
      <Route path={paths.akuChapter.path} element={<AkuChapter />} />
    </Routes>
  );
};

export default MobileRoutes;
