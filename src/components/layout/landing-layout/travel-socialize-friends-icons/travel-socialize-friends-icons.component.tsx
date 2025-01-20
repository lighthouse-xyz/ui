import React from "react";

import { Box, BoxProps } from "@mui/material";
import { ReactComponent as FriendsIcon } from "@src/assets/icons/friends-icon.svg";
import { ReactComponent as SocializeIcon } from "@src/assets/icons/socialize-icon.svg";
import { ReactComponent as TravelIcon } from "@src/assets/icons/travel-icon.svg";

const TravelSocializeFriendsIcons: React.FC<BoxProps> = ({ ...props }) => {
  const maxIconSize = { xs: "32px", smMd: "64px" };

  return (
    <Box
      display="flex"
      {...props}
      maxHeight={maxIconSize}
      maxWidth={{ xs: "131px", smMd: "256px" }}
      flexDirection="row"
      alignItems="center">
      <Box maxHeight={maxIconSize} maxWidth={{ xs: "51px", smMd: "102px" }} minWidth="51px">
        <SocializeIcon aria-label="socialize" width="100%" height="100%" />
      </Box>
      <Box maxHeight={maxIconSize} maxWidth={maxIconSize} minWidth="32px">
        <TravelIcon aria-label="travel" width="100%" height="100%" />
      </Box>
      <Box maxHeight={maxIconSize} maxWidth={maxIconSize} minWidth="32px">
        <FriendsIcon aria-label="friends" width="100%" height="100%" />
      </Box>
    </Box>
  );
};

export default TravelSocializeFriendsIcons;
