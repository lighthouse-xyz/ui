import React, { useState } from "react";

import { sendMessage } from "../../common/messages";
import useUpdateLocationStatus from "../../hooks/use-update-location-status.hook";
import SharingType from "../sharing-type/sharing-type.component";
import ToggleSection from "../toggle-section/toggle-section.component";
import { LocationSharingType } from "@src/common/graphql/generated/user.schema.graphql";

interface ShareLocationSectionProps {
  userId: string;
  defaultAllowsSharingLocation: boolean;
  defaultSharingType: LocationSharingType;
}

const ShareLocationSection: React.FC<ShareLocationSectionProps> = ({
  userId,
  defaultAllowsSharingLocation,
  defaultSharingType,
}) => {
  const [allowsSharingLocation, setAllowsSharingLocation] = useState(defaultAllowsSharingLocation);
  const [locationSharingType, setLocationSharingType] = useState<LocationSharingType>(defaultSharingType);

  const { updateLocationStatus } = useUpdateLocationStatus();

  const setChecked = (value: boolean): void => {
    setAllowsSharingLocation(value);
    sendMessage({ type: "setIsTracking", isTracking: value }).catch(() => {
      // Message did not send properly, ignoring
    });
  };

  React.useEffect(() => {
    void updateLocationStatus({
      variables: {
        userId,
        input: {
          allowsSharingLocation,
          locationSharingType,
        },
      },
    });
  }, [locationSharingType, allowsSharingLocation]);

  return (
    <>
      <ToggleSection checked={allowsSharingLocation} setChecked={setChecked} title={"Share location"} />
      <SharingType locationSharingType={locationSharingType} setSharingType={setLocationSharingType} />
    </>
  );
};

export default ShareLocationSection;
