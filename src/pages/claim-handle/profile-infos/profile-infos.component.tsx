import React from "react";

import Box from "@mui/material/Box";
import { usePrivy } from "@privy-io/react-auth";
import { ReactComponent as ProfileIcon } from "@src/assets/icons/profile-circle-icon.svg";
import Alert from "@src/components/common/alert/alert.component";

const ProfileInfos: React.FC = () => {
  const { user } = usePrivy();

  return (
    <Box alignSelf="stretch">
      <Alert
        color="neutral"
        icon={<ProfileIcon />}
        content={
          user?.email?.address ||
          user?.google?.email ||
          user?.twitter?.username ||
          user?.discord?.email ||
          user?.wallet?.address
        }
      />
    </Box>
  );
};

export default ProfileInfos;
