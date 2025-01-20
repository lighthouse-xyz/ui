import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ClaimHandleHeader from "../../claim-handle-header/claim-handle-header.component";
import ProfileInfos from "../../profile-infos/profile-infos.component";
import SignOutButton from "../../sign-out-button/sign-out-button.component";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ReactComponent as ArrowRight } from "@src/assets/icons/literal-arrow-right-icon.svg";
import paths from "@src/common/paths";
import Alert from "@src/components/common/alert/alert.component";
import { useAuthContext } from "@src/context/auth/auth-context";

const HandleClaimedStep: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { profile, connected } = useAuthContext();

  return (
    <Stack spacing={10} alignItems="center">
      <ClaimHandleHeader
        title={t("handle.successfullyClaimed.title")}
        subtitle={t("handle.successfullyClaimed.subtitle")}
        explanation={t("handle.successfullyClaimed.explanation")}
      />
      {!!profile && (
        <Stack spacing={3} width="100%">
          <ProfileInfos />
          <Alert
            color="success"
            icon="@"
            title={profile.handle}
            sx={{ ".MuiAlertTitle-root": { marginBottom: "0px" } }}
          />
          <Button
            component="div"
            fullWidth
            variant="contained"
            size="large"
            onClick={() => navigate(paths.profile.buildPath(profile.handle || profile.userId))}>
            <Stack direction="row" spacing={3}>
              <Typography>{t("profile.viewYourProfile")}</Typography> <ArrowRight />
            </Stack>
          </Button>
        </Stack>
      )}
      {connected && <SignOutButton />}
    </Stack>
  );
};

export default HandleClaimedStep;
