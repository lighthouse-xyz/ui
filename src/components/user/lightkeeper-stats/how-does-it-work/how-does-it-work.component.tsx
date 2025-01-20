import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Box, Button, Chip, Collapse, Divider, Stack, Typography, useTheme } from "@mui/material";
import { ReactComponent as FacebookLogo } from "@src/assets/logos/facebook-bw-logo.svg";
import { ReactComponent as RedditLogo } from "@src/assets/logos/reddit-bw-logo.svg";
import { ReactComponent as TelegramLogo } from "@src/assets/logos/telegram-bw-logo.svg";
import { ReactComponent as TwitterLogo } from "@src/assets/logos/twitter-bw-logo.svg";
import { borderRadius } from "@src/common/styles/style.const";
import Alert from "@src/components/common/alert/alert.component";
import InviteLinks from "@src/components/user/invite-links/invite-links.component";
import { ArrowDown2, ArrowUp2, DollarCircle, MoneyAdd, Send2, TickCircle } from "iconsax-react";

interface Props {
  userIdOrHandle: string;
}

const HowDoesItWork: React.FC<Props> = ({ userIdOrHandle }) => {
  const { palette } = useTheme();
  const { t } = useTranslation("common", { keyPrefix: "lightkeeperStats.howDoesItWork" });

  const [sectionOpen, setSectionOpen] = useState(true);

  const socialMediaLogoProps = { height: "32px", width: "32px" };

  const steps = [
    {
      title: t("sendInvitations.label"),
      description: t("sendInvitations.description"),
      icon: <Send2 variant="Bulk" size="26px" />,
    },
    {
      title: t("onboard.label"),
      description: t("onboard.description"),
      icon: <TickCircle variant="Bulk" size="26px" />,
    },
    {
      title: t("getRewarded.label"),
      description: t("getRewarded.description"),
      icon: <DollarCircle variant="Bulk" size="26px" />,
    },
  ];

  const actionsRewarded = [
    { points: 1, label: t("actionsRewarded.profileCreated") },
    { points: 2, label: t("actionsRewarded.profilePersonalized") },
    { points: 3, label: t("actionsRewarded.extensionDownloaded") },
    { points: 3, label: t("actionsRewarded.cameBack") },
    { points: 3, label: t("actionsRewarded.followed") },
    { points: 5, label: t("actionsRewarded.jumped") },
  ];

  return (
    <Stack>
      <Button
        fullWidth
        color="inherit"
        disableRipple
        endIcon={
          sectionOpen ? <ArrowUp2 color={palette.action.active} /> : <ArrowDown2 color={palette.action.active} />
        }
        onClick={() => setSectionOpen(!sectionOpen)}
        sx={{
          justifyContent: "space-between",
          typography: "h6",
          paddingLeft: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}>
        {t("label")}
      </Button>
      <Collapse in={sectionOpen} timeout="auto" unmountOnExit>
        <Stack spacing={4} paddingTop={2}>
          <Stack spacing={2}>
            {steps.map(step => (
              <Stack key={`lightkeeper-stats-steps-${step.title}`} direction="row" spacing={3}>
                <Box color="success.light">{step.icon}</Box>
                <Stack spacing={2}>
                  <Typography variant="h8">{step.title}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>

          <Stack bgcolor="background.darker" borderRadius={borderRadius.default} padding={4} spacing={2}>
            {actionsRewarded.map(action => (
              <Stack key={`lightkeeper-stats-action-rewarded-${action.label}`} direction="row" spacing={2}>
                <Chip
                  label={t("reward.points", { count: action.points })}
                  size="small"
                  sx={{
                    width: "64px",
                    background: palette.success.shades?.["30p"],
                    ".MuiChip-label": { typography: "badgeLabel" },
                  }}
                />
                <Typography variant="body2">{action.label}</Typography>
              </Stack>
            ))}
          </Stack>

          <Alert
            color="success"
            icon={<MoneyAdd />}
            content={
              <Typography variant="body2" whiteSpace="pre-line">
                <Trans i18nKey="lightkeeperStats.howDoesItWork.reward.money" components={{ bold: <b /> }} />
              </Typography>
            }
          />

          <Divider />

          <Stack spacing={3}>
            <Stack spacing={3}>
              <Typography variant="h7">{t("shareYourReferralLink.label")}</Typography>
              <Typography variant="body1" color="text.secondary">
                {t("shareYourReferralLink.description")}
              </Typography>
            </Stack>
            <InviteLinks
              userIdOrHandle={userIdOrHandle}
              socialMediaProps={{
                icons: {
                  telegram: <TelegramLogo {...socialMediaLogoProps} />,
                  facebook: <FacebookLogo {...socialMediaLogoProps} />,
                  twitter: <TwitterLogo {...socialMediaLogoProps} />,
                  reddit: <RedditLogo {...socialMediaLogoProps} />,
                },
                spacing: 3,
              }}
              copyLinkButtonProps={{ variant: "contained", inline: true }}
            />
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default HowDoesItWork;
