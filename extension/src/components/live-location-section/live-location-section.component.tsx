import React, { useEffect, useState } from "react";

import useGetShareableLink from "../../hooks/use-get-shareable-link.hook";
import useUpdateLocationStatus from "../../hooks/use-update-location-status.hook";
import ToggleSection from "../toggle-section/toggle-section.component";
import { LoadingButton } from "@mui/lab";
import { useCopyToClipboard } from "usehooks-ts";

interface LiveSectionOptionsProps {
  userId: string;
  defaultActivateLiveLink: boolean;
}

const LiveLocationSection: React.FC<LiveSectionOptionsProps> = ({ userId, defaultActivateLiveLink }) => {
  const [activatePublicLink, setActivateLiveLink] = useState(defaultActivateLiveLink);
  const [getButtonTitle, setButtonTitle] = useState("Copy live location link");
  const { getShareableLink, loading: generatingSharableLinkLoading } = useGetShareableLink({ userId });
  const [, copy] = useCopyToClipboard();
  const { updateLocationStatus } = useUpdateLocationStatus();

  const setChecked = (value: boolean): void => {
    setActivateLiveLink(value);
  };

  const handleCopyToClipboard = (): void => {
    void getShareableLink({
      onCompleted: data => {
        void copy(data.getUserShareableJumpUrl.url).then(() => {
          setButtonTitle("Copied!");
        });
      },
    });
  };

  useEffect(() => {
    void updateLocationStatus({
      variables: {
        userId,
        input: {
          activatePublicLink,
        },
      },
    });
  }, [userId, activatePublicLink]);

  return (
    <>
      <ToggleSection checked={activatePublicLink} setChecked={setChecked} title={"Live location link"} />
      <LoadingButton
        loading={generatingSharableLinkLoading}
        disabled={!activatePublicLink}
        variant="contained"
        onClick={handleCopyToClipboard}>
        {getButtonTitle}
      </LoadingButton>
    </>
  );
};

export default LiveLocationSection;
