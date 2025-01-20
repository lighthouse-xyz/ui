import React from "react";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { World } from "@src/common/graphql/generated/discovery.schema.graphql";
import { getWorldLabel, getWorldLogo } from "@src/utils/worlds.util";

interface Props {
  world?: World;
  tooltip?: boolean;
  size?: string;
}

const WorldLogo: React.FC<Props> = ({ world, tooltip = false, size }) => {
  const { palette } = useTheme();

  const worldLabel = getWorldLabel(world);
  const worldLogo = (): JSX.Element => (
    <Box display="flex" alignItems="center">
      {getWorldLogo(palette.text.primary, world, size)}
    </Box>
  );

  return tooltip && worldLabel ? (
    <Tooltip title={worldLabel} arrow>
      {worldLogo()}
    </Tooltip>
  ) : (
    <>{worldLogo()}</>
  );
};

export default WorldLogo;
