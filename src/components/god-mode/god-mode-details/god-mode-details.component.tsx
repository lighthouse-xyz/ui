import React from "react";
import { useTranslation } from "react-i18next";

import AdminInfo from "../admin-info/admin-info.component";
import EditEntitySection from "../edit-entity-section/edit-entity-section.component";
import EditFeaturedSection from "../edit-featured-section/edit-featured-section.component";
import EditTrendingSection from "../edit-trending-section/edit-trending-section.component";
import VisualizeLightkeeperStats from "../visualize-lightkeeper-stats/visualize-lightkeeper-stats.component";
import { Button, ButtonProps, Divider, Stack, Typography } from "@mui/material";
import paths from "@src/common/paths";
import useDialog from "@src/hooks/utils/use-dialog.hook";

const GodModeDetails: React.FC = () => {
  const { t } = useTranslation();
  const { navigateToDialog } = useDialog();

  const buttonProps: ButtonProps = { variant: "contained", size: "large" };

  return (
    <Stack spacing={6} alignItems="stretch" width="100%">
      <Typography variant="h6">{t("godMode.adminInfo.heading")}</Typography>
      <AdminInfo />
      <Divider />
      <Typography variant="h6">{t("godMode.create.heading")}</Typography>
      <Button {...buttonProps} onClick={() => navigateToDialog(paths.godModeCreateGate)}>
        {t("godMode.create.addGate")}
      </Button>
      <Button {...buttonProps} onClick={() => navigateToDialog(paths.godModeCreateEvent)}>
        {t("godMode.create.createEvent")}
      </Button>
      <Button {...buttonProps} onClick={() => navigateToDialog(paths.godModeCreatePlace)}>
        {t("godMode.create.addPlace")}
      </Button>
      <Divider />
      <EditEntitySection />
      <Divider />
      <EditFeaturedSection />
      <Divider />
      <EditTrendingSection />
      <Divider />
      <VisualizeLightkeeperStats />
    </Stack>
  );
};

export default GodModeDetails;
