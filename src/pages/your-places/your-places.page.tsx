import React from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import paths from "@src/common/paths";
import BackButton from "@src/components/common/back-button/back-button.component";
import LoadingIndicator from "@src/components/common/loading-indicator/loading-indicator.component";
import PlacesResultsList from "@src/components/user/places-results-list/places-results-list.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import useDialog from "@src/hooks/utils/use-dialog.hook";

const YourPlaces: React.FC = () => {
  const { t } = useTranslation();
  const { navigateToDialog } = useDialog();

  const { profile, loading: profileLoading } = useAuthContext();

  return (
    <>
      {!!profile && (
        <>
          <Box alignSelf="flex-start">
            <BackButton
              label={t("profile.backToProfile")}
              destination={paths.profile.buildPath(profile.handle ?? profile.userId)}
            />
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            marginBottom={4}
            marginTop={8}>
            <Typography variant="h5">{t("places.yourPlaces.label")}</Typography>
            <Button variant="contained" onClick={() => navigateToDialog(paths.createPlace)}>
              {t("places.create")}
            </Button>
          </Stack>

          <Typography variant="body1" color="text.secondary" marginBottom={8}>
            {t("places.yourPlaces.pageDescription")}
          </Typography>
          <PlacesResultsList userId={profile.userId} />
        </>
      )}

      {profileLoading && <LoadingIndicator size="70px" />}
    </>
  );
};

export default YourPlaces;
