import React from "react";

import useGetLocationStatus from "../../hooks/use-get-location-status.hook";
import LiveLocationSection from "../live-location-section/live-location-section.component";
import ShareLocationSection from "../share-location-section/share-location-section.component";
import StatusBubbles from "../status-bubbles/status-bubbles.component";
import { RoundedPaper } from "./online-section.style";
import { Stack } from "@mui/material";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";

interface OnlineSectionProps {
  userId: string;
}

const OnlineSection: React.FC<OnlineSectionProps> = ({ userId }) => {
  const { data, loading } = useGetLocationStatus({ userId });

  return (
    <>
      {data ? (
        <RoundedPaper elevation={0}>
          <Stack spacing={2}>
            <StatusBubbles
              userId={userId}
              appearOffline={data.status.appearOffline}
              allowsSharingLocation={data.locationStatus.allowsSharingLocation}
              currentLocation={data.locationStatus.lastLocation?.url}
              currentLocationWorld={data.locationStatus.lastLocation?.world}
            />
            <ShareLocationSection
              defaultAllowsSharingLocation={data.locationStatus.allowsSharingLocation}
              defaultSharingType={data.locationStatus.locationSharingType}
              userId={userId}
            />
            <LiveLocationSection defaultActivateLiveLink={data.locationStatus.activatePublicLink} userId={userId} />
          </Stack>
        </RoundedPaper>
      ) : (
        <>{loading && <LoadingIndicator size="70px" />}</>
      )}
    </>
  );
};

export default OnlineSection;
