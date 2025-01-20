import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { StartExploringButton } from "./landing.style";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ReactComponent as SearchIcon } from "@src/assets/icons/mouse-circle-icon.svg";
import paths from "@src/common/paths";
import TravelSocializeFriendsIcons from "@src/components/layout/landing-layout/travel-socialize-friends-icons/travel-socialize-friends-icons.component";

const Landing: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack minHeight="70vh" justifyContent="space-between" spacing={20}>
      <Stack alignItems="flex-end" justifyContent="flex-end">
        <TravelSocializeFriendsIcons justifyContent="flex-end" columnGap={4} marginBottom={{ xs: 8, smMd: 16 }} />
        <Typography variant="h2FkGrotesk" textAlign="right" maxWidth="761px" marginBottom={{ xs: 6, smMd: 10 }}>
          {t("app.subtitle")}
        </Typography>
        <Box width={{ xs: "100%", md: "676px" }} height={{ xs: "44px", smMd: "88px" }}>
          <StartExploringButton
            fullWidth
            variant="outlined"
            color="secondary"
            bgcoloronhover="rgba(131,198,55,1)"
            sx={{ padding: { xs: "8px 16px 8px 24px", smMd: "16px 32px 16px 48px" } }}
            onClick={() => navigate(paths.home)}>
            <Typography variant="button1">{t("app.launchApp")}</Typography>
            <Box height={{ xs: "18px", smMd: "36px" }} width={{ xs: "18px", smMd: "36px" }}>
              <SearchIcon height="100%" width="100%" />
            </Box>
          </StartExploringButton>
        </Box>
      </Stack>

      <Stack alignItems="flex-start" justifyContent="flex-start">
        <Typography variant="h1FkGrotesk" maxWidth="1248px" component="div">
          <Trans i18nKey="app.header" components={{ italic: <Typography variant="h1IvyOra" /> }} />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Landing;
