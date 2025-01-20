import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import InviteLinks from "../invite-links/invite-links.component";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as FacebookLogo } from "@src/assets/logos/facebook-logo.svg";
import { ReactComponent as RedditLogo } from "@src/assets/logos/reddit-logo.svg";
import { ReactComponent as TelegramLogo } from "@src/assets/logos/telegram-logo.svg";
import { ReactComponent as TwitterLogo } from "@src/assets/logos/twitter-logo.svg";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";

const InviteFriendDialog: React.FC = () => {
  const dialogName = "invite-friend-dialog";
  const logoSize = "32px";

  const location = useLocation();
  const { t } = useTranslation();

  const logoProps = { height: logoSize, width: logoSize };

  return (
    <DialogFrame aria-labelledby={`${dialogName}-title`}>
      <Stack padding={6} spacing={3}>
        <Stack spacing={3}>
          <Typography variant="h6" id={`${dialogName}-title`}>
            {t("inviteFriend.dialog.title")}
          </Typography>
          <Typography variant="body1">{t("inviteFriend.dialog.subtitle")}</Typography>
        </Stack>
        <InviteLinks
          userIdOrHandle={(location.state as { userIdOrHandle: string }).userIdOrHandle}
          socialMediaProps={{
            icons: {
              telegram: <TelegramLogo {...logoProps} />,
              facebook: <FacebookLogo {...logoProps} />,
              twitter: <TwitterLogo {...logoProps} />,
              reddit: <RedditLogo {...logoProps} />,
            },
            spacing: 6,
          }}
          copyLinkButtonProps={{ variant: "outlined", fullWidth: true }}
        />
      </Stack>
    </DialogFrame>
  );
};

export default InviteFriendDialog;
