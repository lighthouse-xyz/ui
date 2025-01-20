import React from "react";

import useAppearOnline from "../../hooks/use-appear-online.hook";
import { getWorldLogo } from "../../utils/world-logo.util";
import OpenLighthouseButton from "../open-lighthouse-button/open-lighthouse-button.component";
import { Stack, Typography } from "@mui/material";
import { World } from "@src/common/graphql/generated/discovery.schema.graphql";
import Alert from "@src/components/common/alert/alert.component";
import { getWorldLabel } from "@src/utils/worlds.util";

interface StatusBubbleProps {
  userId: string;
  appearOffline: boolean;
  allowsSharingLocation: boolean;
  currentLocation?: string;
  currentLocationWorld?: World;
}

const StatusBubbles: React.FC<StatusBubbleProps> = ({
  userId,
  appearOffline,
  allowsSharingLocation,
  currentLocation,
  currentLocationWorld,
}) => {
  const { appearOnline } = useAppearOnline(userId);
  const worldLabel = getWorldLabel(currentLocationWorld);

  return allowsSharingLocation ? (
    <>
      {!!currentLocation && (
        <Alert
          color="success"
          icon={false}
          content={
            <>
              Currently in:
              <Typography variant="body1" marginTop={1} component={"div"}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <img src={getWorldLogo(currentLocationWorld)} height="22px" width="22px" />
                  <div>{worldLabel}</div>
                </Stack>
              </Typography>
            </>
          }
        />
      )}
      {!currentLocation && (
        <Alert
          color="info"
          icon={false}
          content="Find a world to jump into!"
          action={{
            content: <OpenLighthouseButton />,
            position: "bottom",
          }}
        />
      )}
      {appearOffline && (
        <Alert
          color="warning"
          icon={false}
          content="Your status on Lighthouse must be set to online to share your location with your friends"
          action={{
            content: "Appear online",
            onClick: () => void appearOnline(),
            position: "bottom",
          }}
        />
      )}
    </>
  ) : (
    <Alert
      color="primary"
      icon={false}
      content="You must share your location for us to detect where you are and share that info with your friends"
    />
  );
};

export default StatusBubbles;
