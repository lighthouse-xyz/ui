import React from "react";
import { useTranslation } from "react-i18next";

import EditTrending from "./edit-trending-dialog/edit-trending-dialog.component";
import { Typography } from "@mui/material";

const EditTrendingSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6">{t("godMode.trending.heading")}</Typography>
      <EditTrending type="entities" label="entities (mixed events & places)" />
      <EditTrending type="users" label="users" />
    </>
  );
};

export default EditTrendingSection;
