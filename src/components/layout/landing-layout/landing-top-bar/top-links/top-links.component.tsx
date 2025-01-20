import React from "react";
import { useTranslation } from "react-i18next";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ReactComponent as OpenLinkIcon } from "@src/assets/icons/arrow-top-right-icon.svg";
import links from "@src/common/links";
import paths from "@src/common/paths";

interface LinkObject {
  link: string;
  label: string;
  withIcon: boolean;
}

const TopLinks: React.FC = () => {
  const { t } = useTranslation();

  const linksList = [
    [{ link: links.externalPages.about, label: `${t("app.externalPages.about")} +`, withIcon: false }],
    [
      { link: paths.home, label: t("app.startExploringWorlds"), withIcon: false },
      { link: links.externalPages.downloadExtension, label: t("app.getChromeExtension"), withIcon: false },
    ],
  ];

  const getOpenLink = ({ link, label, withIcon }: LinkObject): JSX.Element => (
    <Link
      key={`landing-link-${label}`}
      href={link}
      target={link !== paths.home ? "_blank" : undefined}
      textAlign="right"
      underline="none"
      color="inherit">
      <Typography noWrap variant="p" display="inline-flex" alignItems="center">
        {label}
        {withIcon && <OpenLinkIcon width="24px" height="24px" />}
      </Typography>
    </Link>
  );

  return (
    <Stack direction={{ xs: "column", md: "row" }} columnGap={{ xs: 0, md: 10, mdLg: 20 }}>
      {linksList.map((col, colIndex) => (
        <Stack key={`${colIndex}-links-landing-column`}>{col.map(link => getOpenLink(link))}</Stack>
      ))}
    </Stack>
  );
};

export default TopLinks;
