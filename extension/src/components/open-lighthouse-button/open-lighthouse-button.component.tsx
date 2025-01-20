import React from "react";

import { getEnvBasedOnConfigValues } from "../../utils/env";
import { Link, Typography } from "@mui/material";
import { ReactComponent as OpenLinkIcon } from "@src/assets/icons/open-link-icon.svg";

const OpenLighthouseButton: React.FC = () => {
  return (
    <Link href={getEnvBasedOnConfigValues()} target="_blank" textAlign="right" underline="none" color="inherit">
      <Typography variant="button" fontSize="13px" display="flex" alignItems="center" gap="4px">
        Open Lighthouse.world
        <OpenLinkIcon color="text.secondary" width="16px" height="16px" />
      </Typography>
    </Link>
  );
};

export default OpenLighthouseButton;
