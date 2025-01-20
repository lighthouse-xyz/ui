import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import paths from "@src/common/paths";
import BackButton from "@src/components/common/back-button/back-button.component";

const GodModeLightkeeperStatsLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box padding={10}>
      <BackButton destination={paths.godMode} label={t("godMode.backToGodMode")} />
      <Divider sx={{ marginBottom: 10 }} />
      <Outlet />
    </Box>
  );
};

export default GodModeLightkeeperStatsLayout;
