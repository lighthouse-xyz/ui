import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MoreIconButton } from "./landing-top-bar.style";
import TopLinks from "./top-links/top-links.component";
import { Box, Collapse, useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ReactComponent as MoreIcon } from "@src/assets/icons/close-icon.svg";
import { ReactComponent as LighthouseLogo } from "@src/assets/logos/lighthouse-bold-logo-with-text.svg";
import paths from "@src/common/paths";

const LandingTopBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const collapseLinks = useMediaQuery(theme.breakpoints.down("md"));
  const [showLinks, setShowLinks] = useState(false);

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={{ xs: 4, sm: 14 }}
        alignItems={{ xs: "center", md: "flex-start" }}>
        <Box>
          <LighthouseLogo width="100%" height="100%" cursor="pointer" onClick={() => navigate(paths.home)} />
        </Box>

        {collapseLinks ? (
          <Stack alignItems="flex-end">
            <MoreIconButton
              onClick={() => setShowLinks(!showLinks)}
              style={{ transform: !showLinks ? "rotate(-45deg)" : undefined }}>
              <MoreIcon color="common.white" />
            </MoreIconButton>
          </Stack>
        ) : (
          <TopLinks />
        )}
      </Stack>
      {collapseLinks && (
        <Collapse in={showLinks}>
          <Box marginTop={5}>
            <TopLinks />
          </Box>
        </Collapse>
      )}
    </Stack>
  );
};

export default LandingTopBar;
