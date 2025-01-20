import React from "react";
import { Trans } from "react-i18next";

import { Link, Paper, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as DiscordLogo } from "@src/assets/logos/discord-bw-logo.svg";
import { ReactComponent as MediumLogo } from "@src/assets/logos/medium-logo.svg";
import { ReactComponent as MirrorLogo } from "@src/assets/logos/mirror-bw-logo.svg";
import { ReactComponent as TwitterLogo } from "@src/assets/logos/twitter-bw-logo.svg";
import { OpenChromeStoreOrigin, TrackEvent } from "@src/common/enums/track-events.enum";
import links from "@src/common/links";
import useMixpanelTrack from "@src/hooks/utils/use-mixpanel-track.hook";
import { resources } from "@src/locales/i18n";

const Footer: React.FC = () => {
  const sizeLogo = "24px";

  const theme = useTheme();
  const trackInMixpanel = useMixpanelTrack();

  const pages = [
    [
      {
        label: "app.externalPages.about",
        link: links.externalPages.about,
      },
      {
        label: "app.externalPages.starmap",
        link: links.externalPages.roadmap,
      },
      {
        label: "app.externalPages.jobs",
        link: links.externalPages.jobs,
      },
    ],
    [
      {
        label: "app.externalPages.privacy",
        link: links.externalPages.privacy,
      },
      {
        label: "app.externalPages.terms",
        link: links.externalPages.terms,
      },
    ],
    [
      {
        label: "app.externalPages.support",
        link: links.externalPages.support,
      },
      {
        label: "app.externalPages.browserExtension",
        link: links.externalPages.downloadExtension,
      },
    ],
  ];

  const socialMedias = [
    {
      logo: <TwitterLogo width={sizeLogo} height={sizeLogo} />,
      link: links.socialMedia.twitter,
    },
    {
      logo: <DiscordLogo width={sizeLogo} height={sizeLogo} />,
      link: links.socialMedia.discord,
    },
    {
      logo: <MirrorLogo width={sizeLogo} height={sizeLogo} />,
      link: links.socialMedia.mirror,
    },
    {
      logo: <MediumLogo width={sizeLogo} height={sizeLogo} />,
      link: links.socialMedia.medium,
    },
  ];

  const handleOpenChromeStoreClick = (): void => {
    trackInMixpanel(TrackEvent.openChromeStore, { origin: OpenChromeStoreOrigin.footer });
  };

  return (
    <Paper component="footer" elevation={0} square sx={{ borderTop: 1, borderTopColor: theme.palette.divider }}>
      <Stack spacing={10} padding={10}>
        <Grid container spacing={20} justifyContent="space-between">
          <Grid item>
            <Grid container columnSpacing={20} rowSpacing={4}>
              {pages.map((col, colIndex) => (
                <Grid key={`${colIndex}-footer-pages-column`} item xs="auto">
                  {col.map((page, pageIndex) => (
                    <Box key={`${pageIndex}-${page.label}-footer-page`}>
                      <Link
                        href={page.link}
                        onClick={
                          page.link === links.externalPages.downloadExtension ? handleOpenChromeStoreClick : undefined
                        }
                        target="_blank"
                        rel="noopener"
                        underline="none"
                        color="text.secondary"
                        variant="caption">
                        <Trans i18nKey={page.label as keyof typeof resources.en.common} components={{ del: <del /> }} />
                      </Link>
                    </Box>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {socialMedias.map((socialMedia, index) => (
                <Link
                  key={`${index}-${socialMedia.link}-footer-social-media`}
                  href={socialMedia.link}
                  color="text.disabled"
                  target="_blank"
                  rel="noopener">
                  {socialMedia.logo}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Stack spacing={2}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Lighthouse Meta Technologies
          </Typography>

          <Typography variant="caption" color="text.disabled">
            This site is protected by reCAPTCHA and the Google{" "}
            <Link href="https://policies.google.com/privacy" color="text.disabled">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="https://policies.google.com/terms" color="text.disabled">
              Terms of Service
            </Link>{" "}
            apply.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Footer;
