import React from "react";
import { useTranslation } from "react-i18next";

import ClaimAvatarButtons from "../claim-avatar-buttons/claim-avatar-buttons.component";
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import claimAvatarsImage from "@src/assets/images/onboarding-claim-avatars-image.jpg";
import { ClaimAvatarType } from "@src/common/graphql/generated/user.schema.graphql";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";

interface Props {
  userId: string;
  onClose: () => void;
}

const ClaimInviteAvatarDialog: React.FC<Props> = ({ userId, onClose }) => {
  const { t } = useTranslation();

  return (
    <DialogFrame persistent width="smMd" onClose={onClose}>
      <Card elevation={0}>
        <CardMedia sx={{ height: 276 }} image={claimAvatarsImage} title="claim invite avatar" />
        <Stack spacing={6} whiteSpace="pre-line" paddingX={10} paddingY={6} textAlign="center" height="content-fit">
          <Typography variant="h5">{t("onboarding.claimInviteAvatar.title")}</Typography>

          <Typography variant="body1" color="text.secondary">
            {t("onboarding.claimInviteAvatar.subtitle")}
          </Typography>

          <ClaimAvatarButtons userId={userId} avatarType={ClaimAvatarType.avatarInviteClaimed} />
        </Stack>
      </Card>
    </DialogFrame>
  );
};

export default ClaimInviteAvatarDialog;
