import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Location, Route, Routes, useLocation, useSearchParams } from "react-router-dom";

import "../locales/i18n";
import { TrackEvent } from "../common/enums/track-events.enum";
import PageMetadata from "../components/common/page-metadata/page-metadata.component";
import { useVrContext } from "../context/vr/vr-context";
import useFeatureFlag, { FeatureFlag } from "../hooks/utils/use-feature-flag.hook";
import useMixpanelTrack from "../hooks/utils/use-mixpanel-track.hook";
import Maintenance from "../pages/maintenance/maintenance.page";
import MainRoutes from "./main-routes";
import MobileRoutes from "./mobile-routes";
import VrRoutes from "./vr-routes";

export interface LocationState {
  backgroundLocation?: Location;
  fromDialog?: boolean;
}

const Router: React.FC = () => {
  const { isFeatureEnabled } = useFeatureFlag();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const { vrMode } = useVrContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const trackInMixpanel = useMixpanelTrack();

  useEffect(() => {
    if (!state?.backgroundLocation && !state?.fromDialog && !location.search) {
      window.scrollTo(0, 0);
    }
    if (searchParams.get("utm")) {
      trackInMixpanel(TrackEvent.trackUtm, { windowLocation: window.location.href }, () => setSearchParams());
    }
  }, [location]);

  return (
    <>
      <PageMetadata />

      {isMobile ? (
        <MobileRoutes />
      ) : isFeatureEnabled(FeatureFlag.maintenance) ? (
        <Routes>
          <Route path="*" element={<Maintenance />} />
        </Routes>
      ) : vrMode ? (
        <VrRoutes state={state} />
      ) : (
        <MainRoutes state={state} />
      )}
    </>
  );
};

export default Router;
