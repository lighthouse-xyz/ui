import React from "react";
import { useTranslation } from "react-i18next";

import EditFeatured from "./edit-featured-dialog/edit-featured-dialog.component";
import { Typography } from "@mui/material";
import { EntityType } from "@src/common/graphql/generated/discovery.schema.graphql";

const EditFeaturedSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6">{t("godMode.featured.heading")}</Typography>
      <EditFeatured type="all" label="entities (mixed events & places)" />
      <EditFeatured type={EntityType.parcel} label="places" />
      <EditFeatured type={EntityType.event} label="events" />
      <EditFeatured type={EntityType.member} label="creators" />
      <EditFeatured type="all" label="entities (mixed events & places, VR)" vrMode />
      <EditFeatured type={EntityType.parcel} label="places (VR)" vrMode />
      <EditFeatured type={EntityType.event} label="events (VR)" vrMode />
    </>
  );
};

export default EditFeaturedSection;
