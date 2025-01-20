import React from "react";
import { useTranslation } from "react-i18next";

import AkuHeader from "../aku-header/aku-header.component";
import OpenLink from "./open-link/open-link.component";
import { Box, Stack } from "@mui/material";
import lighthouseAkuLogo from "@src/assets/logos/lighthouse+aku-logo.svg";

const AkuLandingHeader: React.FC = () => {
  const { t } = useTranslation("aku");

  const topContent = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ sm: 8 }}
      justifyContent={{ xs: "center", sm: "space-between" }}
      alignItems={{ xs: "center", sm: "flex-start" }}
      width="100%">
      <Box
        component="img"
        src={lighthouseAkuLogo}
        height="131px"
        width="174px"
        order={{ xs: 2, sm: 1 }}
        marginTop={{ xs: 16, sm: 0 }}
      />
      <Stack
        order={{ xs: 1, sm: 2 }}
        direction={{ xs: "row", sm: "column" }}
        spacing={{ xs: 6, sm: 1 }}
        justifyContent={{ xs: "center", sm: "flex-end" }}>
        <OpenLink label="lighthouse.world" url="https://lighthouse.world/" />
        <OpenLink label="aku.world" url="https://aku.world/" />
      </Stack>
    </Stack>
  );
  return <AkuHeader title={t("landing.title")} subtitle={t("landing.subtitle")} topContent={topContent} />;
};

export default AkuLandingHeader;
