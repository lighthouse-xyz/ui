import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Button, Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { usePrivy } from "@privy-io/react-auth";
import { ReactComponent as EmailIcon } from "@src/assets/icons/email-icon.svg";
import { ReactComponent as WalletIcon } from "@src/assets/icons/wallet-icon.svg";
import { OpenChromeStoreOrigin } from "@src/common/enums/track-events.enum";
import paths from "@src/common/paths";
import Alert from "@src/components/common/alert/alert.component";
import DownloadExtensionButton from "@src/components/common/download-extension-button/download-extension-button.component";
import WalletAddress from "@src/components/user/wallet-address/wallet-address.component";
import useProfileFromToken from "@src/hooks/user/use-profile-from-token.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";

interface ActionProps {
  label: string;
  color: "primary" | "error";
  onClick: () => void;
}

interface TextBoxProps {
  value: JSX.Element;
  icon: JSX.Element;
  unlink?: () => void;
}

interface AccountSettingsItem {
  title: string;
  description?: string;
  warning?: string;
  textBox?: TextBoxProps;
  buttons: (JSX.Element | ActionProps)[];
}

function buttonAsActionProps(button: JSX.Element | ActionProps): button is ActionProps {
  return "label" in button && "color" in button && "onClick" in button;
}

const AccountSettings: React.FC = () => {
  const typographyValue = "h9";

  const { t } = useTranslation();
  const { navigateToDialog } = useDialog();
  const { showToast } = useToast({ variant: "error" });

  const { getProfileFromToken } = useProfileFromToken();
  const { linkWallet, linkEmail, unlinkEmail, createWallet, user, ready } = usePrivy();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<string | undefined>(undefined);

  const unlinkNotAvailable = (!!email && !wallet) || (!!wallet && !email);

  useEffect(() => {
    if (ready) {
      setEmail(user?.email?.address);
      setWallet(user?.wallet?.address);
      void getProfileFromToken();
    }
  }, [ready, user]);

  const sections: AccountSettingsItem[] = [
    {
      title: t("account.emailSection.title"),
      buttons: [
        {
          label: t("cta.addEmail"),
          color: "primary",
          onClick: linkEmail,
        },
      ],
      textBox: email
        ? {
            value: <Typography variant={typographyValue}>{email}</Typography>,
            unlink: () => void unlinkEmail(email),
            icon: <EmailIcon />,
          }
        : undefined,
    },
    {
      title: t("account.walletSection.title"),
      description: t("account.walletSection.description"),
      buttons: [
        {
          label: t("wallet.connectWallet"),
          color: "primary",
          onClick: linkWallet,
        },
        {
          label: t("cta.createWallet"),
          color: "primary",
          onClick: () => void createWallet().catch(_ => showToast(t("error.generic"))),
        },
      ],
      textBox: wallet
        ? {
            value: <WalletAddress walletAddress={wallet} typography={typographyValue} />,
            icon: <WalletIcon />,
          }
        : undefined,
    },
    {
      title: t("account.extensionSection.title"),
      description: t("account.extensionSection.description"),
      buttons: [
        <DownloadExtensionButton
          key="account-settings-button-download-extension"
          variant="outlined"
          size="large"
          origin={OpenChromeStoreOrigin.accountSettings}
        />,
      ],
    },
    {
      title: t("account.data"),
      warning: t("warning.requestTakesTime"),
      buttons: [
        {
          label: t("account.delete"),
          color: "error",
          onClick: () => navigateToDialog(paths.deleteAccount),
        },
      ],
    },
  ];

  return (
    <Stack spacing={7} divider={<Divider />}>
      {sections.map(section => (
        <Stack key={`account-section-${section.title}`} spacing={8}>
          <Stack spacing={2}>
            <Typography variant="h7">{section.title}</Typography>
            {!!section.description && (
              <Typography variant="body1" color="text.secondary">
                {section.description}
              </Typography>
            )}
          </Stack>

          <Stack spacing={4} alignItems="flex-start">
            {!!section.warning && (
              <Typography variant="body1" color="text.secondary">
                {section.warning}
              </Typography>
            )}
            {!!section.textBox && (
              <Box alignSelf="stretch">
                <Alert
                  color="neutral"
                  icon={section.textBox.icon}
                  content={section.textBox.value}
                  action={
                    section.textBox.unlink
                      ? {
                          content: t("cta.unlink"),
                          onClick: section.textBox.unlink,
                          disabled: unlinkNotAvailable,
                        }
                      : undefined
                  }
                  sx={{ alignItems: "center" }}
                />
              </Box>
            )}
            {!section.textBox && !!section.buttons && (
              <Stack direction="row" spacing={2}>
                {section.buttons.map((button, index) =>
                  buttonAsActionProps(button) ? (
                    <Button
                      key={`account-settings-button-${button.label}`}
                      variant="outlined"
                      color={button.color}
                      size="large"
                      onClick={button.onClick}>
                      {button.label}
                    </Button>
                  ) : (
                    <div key={`account-settings-button-object-${index}`}>{button}</div>
                  ),
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default AccountSettings;
