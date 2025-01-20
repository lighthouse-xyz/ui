import React from "react";
import { useTranslation } from "react-i18next";

import { Button, ButtonProps, IconButton, Stack, TextField } from "@mui/material";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import useInviteLinks, { InviteType } from "@src/hooks/utils/use-invite-links.hook";
import { Link21 } from "iconsax-react";

type SocialMediaIcons = { [key in InviteType]: JSX.Element };

interface CopyLinkButtonProps extends ButtonProps {
  inline?: boolean;
}

interface SocialMediaProps {
  icons: SocialMediaIcons;
  spacing: number;
}

interface Props {
  userIdOrHandle: string;
  socialMediaProps: SocialMediaProps;
  copyLinkButtonProps: CopyLinkButtonProps;
}

const InviteLinks: React.FC<Props> = ({ userIdOrHandle, socialMediaProps, copyLinkButtonProps }) => {
  const { t } = useTranslation();

  const { icons: socialMediaIcons, spacing: iconsSpacing } = socialMediaProps;
  const { inline: inlineCopyLinkButton, ...copyLinkMuiButtonProps } = copyLinkButtonProps;

  const { handleInviteClick, getReferralLink } = useInviteLinks();
  const profileLink = getReferralLink(userIdOrHandle);

  return (
    <Stack spacing={6}>
      <Stack direction="row" justifyContent="center" spacing={iconsSpacing}>
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            handleInviteClick(InviteType.telegram);
          }}>
          {socialMediaIcons.telegram}
        </IconButton>
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            handleInviteClick(InviteType.facebook);
          }}>
          {socialMediaIcons.facebook}
        </IconButton>
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            handleInviteClick(InviteType.twitter);
          }}>
          {socialMediaIcons.twitter}
        </IconButton>
        <IconButton
          size="large"
          color="primary"
          onClick={() => {
            handleInviteClick(InviteType.reddit);
          }}>
          {socialMediaIcons.reddit}
        </IconButton>
      </Stack>

      <Stack spacing={3} alignItems="center" direction={inlineCopyLinkButton ? "row" : "column"}>
        <TextField
          fullWidth
          defaultValue={profileLink}
          InputProps={{
            readOnly: true,
          }}
        />
        <CopyToClipboard
          activator={
            <Button
              variant={copyLinkMuiButtonProps.variant}
              size="large"
              sx={{ minWidth: "145px", ...copyLinkMuiButtonProps.sx }}
              aria-label="copy profile link"
              {...copyLinkMuiButtonProps}>
              <Stack direction="row" spacing={2}>
                <Link21 />
                <div>{t("cta.copyLink")}</div>
              </Stack>
            </Button>
          }
          content={profileLink}
        />
      </Stack>
    </Stack>
  );
};

export default InviteLinks;
