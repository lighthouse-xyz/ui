import React from "react";
import { Trans } from "react-i18next";

import { Stack, Typography } from "@mui/material";
import TravelSocializeFriendsIcons from "@src/components/layout/landing-layout/travel-socialize-friends-icons/travel-socialize-friends-icons.component";

const HomeMobile: React.FC = () => {
  const text = ["app.notMobileFriendly.paraph1", "app.notMobileFriendly.paraph2"];

  return (
    <Stack justifyContent="center" alignItems="center" spacing={16} color="common.white">
      <TravelSocializeFriendsIcons columnGap={2} />
      <Stack spacing={4} textAlign="center" whiteSpace="pre-line">
        {text.map(paragraph => (
          <Typography key={`landing-mobile-paragraph-${paragraph}`} variant="h2FkGrotesk" component="div">
            <Trans i18nKey={paragraph} components={{ italic: <Typography variant="h2IvyOra" /> }} />
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default HomeMobile;
