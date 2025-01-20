import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import ClaimAvatarButtons from "../claim-avatar-buttons/claim-avatar-buttons.component";
import OnboardingChecklistItem from "../onboarding-checklist-item/onboarding-checklist-item.component";
import { Card, CardMedia, Stack, Typography, useTheme } from "@mui/material";
import claimAvatarsImage from "@src/assets/images/onboarding-claim-avatars-image.jpg";
import { ClaimAvatarType } from "@src/common/graphql/generated/user.schema.graphql";
import Alert from "@src/components/common/alert/alert.component";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import { useUserStateContext } from "@src/context/user-state/user-state-context";
import { useGetUserOnboardingState } from "@src/hooks/user/use-get-user-onboarding-state.hook";
import useInviteLinks from "@src/hooks/utils/use-invite-links.hook";
import { Copy, DirectboxSend } from "iconsax-react";

const ClaimAvatarsDialog: React.FC = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();

  const { onboardingButtonDismissed } = useUserStateContext();
  const [onboardingAvatarClaimed, setOnboardingAvatarClaimed] = useState(false);

  const { getReferralLink } = useInviteLinks();
  const state = location.state as { userId: string; handle?: string };
  const { loading: loadingState, data } = useGetUserOnboardingState({ userId: state.userId });

  const onboardingState = data?.userOnboardingState;
  const inviteFriendCompleted = !!onboardingState?.stepInviteFriendAt;
  const referralLink = getReferralLink(state.handle ?? state.userId);

  useEffect(() => {
    if (onboardingAvatarClaimed) {
      onboardingButtonDismissed.setValue(true);
    }
  }, [onboardingAvatarClaimed]);

  return (
    <DialogFrame persistent width="smMd">
      <Card elevation={0}>
        <CardMedia sx={{ height: 276 }} image={claimAvatarsImage} title="claim avatars" />
        <Stack spacing={6} whiteSpace="pre-line" paddingX={10} paddingY={6} textAlign="center" height="content-fit">
          <Typography variant="h5">{t("onboarding.claimAvatars.title")}</Typography>

          <ClaimAvatarButtons
            userId={state.userId}
            avatarType={ClaimAvatarType.avatarOnboardingClaimed}
            loading={loadingState}
            setAvatarClaimed={setOnboardingAvatarClaimed}
          />
          <Typography variant="body1" color="text.secondary">
            {t("onboarding.claimAvatars.unlockSecondAvatar")}
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" color="text.secondary">
              {t("onboarding.claimAvatars.sendThemLink")}
            </Typography>
            <Alert
              icon={<DirectboxSend color={palette.action.active} />}
              content={
                <CopyToClipboard
                  content={referralLink}
                  activator={
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      textAlign="start"
                      sx={{ cursor: "pointer" }}>
                      <Typography variant="h9" noWrap width="90%">
                        {referralLink}
                      </Typography>
                      <Copy color={palette.action.active} />
                    </Stack>
                  }
                />
              }
              sx={{ ".MuiAlert-message": { width: "100%" } }}
            />
          </Stack>
          <OnboardingChecklistItem
            completed={inviteFriendCompleted}
            label={t("onboarding.claimAvatars.inviteFriendStep")}
          />
          <ClaimAvatarButtons
            userId={state.userId}
            avatarType={ClaimAvatarType.avatarInviteClaimed}
            loading={loadingState}
            disabled={!inviteFriendCompleted}
          />
        </Stack>
      </Card>
    </DialogFrame>
  );
};

export default ClaimAvatarsDialog;
