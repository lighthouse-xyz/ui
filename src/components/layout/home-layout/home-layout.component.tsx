import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Trans, useTranslation } from "react-i18next";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

import { Typography, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import zIndex from "@mui/material/styles/zIndex";
import { ReactComponent as HomeIcon } from "@src/assets/icons/home-bold-icon.svg";
import { ReactComponent as PeopleIcon } from "@src/assets/icons/profile-frame-bold-icon.svg";
import { ReactComponent as PlacesIcon } from "@src/assets/icons/sign-post-bold-icon.svg";
import paths from "@src/common/paths";
import { borderRadius } from "@src/common/styles/style.const";
import ToggleButtonGroup from "@src/components/common/toggle-button-group/toggle-button-group.component";
import { useVrContext } from "@src/context/vr/vr-context";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { add } from "date-fns";
import { ReactComponent as EventsIcon } from "src/assets/icons/calendar-bold-icon.svg";

const HomeLayout: React.FC = () => {
  const lightkeeperParam = "lightkeeper";
  const ambassadorIdCookie = "ambassador-id";
  const sevenDaysFromNow = add(new Date(), { days: 7 });

  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const { vrMode } = useVrContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [_cookies, setCookies] = useCookies([ambassadorIdCookie]);

  const pages = [
    { value: paths.home, label: t("home.overview"), icon: <HomeIcon />, path: paths.home },
    { value: paths.events, label: t("events.label"), icon: <EventsIcon />, path: paths.events },
    { value: paths.places, label: t("places.label"), icon: <PlacesIcon />, path: paths.places },
    ...conditionalItem(!vrMode, {
      value: paths.people,
      label: t("people.label"),
      icon: <PeopleIcon />,
      path: paths.people,
    }),
  ];

  useEffect(() => {
    const ambassadorId = searchParams.get(lightkeeperParam);
    if (ambassadorId) {
      setCookies(ambassadorIdCookie, ambassadorId, {
        path: "/",
        expires: sevenDaysFromNow,
        domain: ".lighthouse.world",
        secure: true,
      });
      setSearchParams();
    }
  }, [searchParams.get(lightkeeperParam)]);

  return (
    <Stack spacing={9}>
      <Stack
        position="fixed"
        justifyContent="center"
        alignSelf="center"
        borderRadius={borderRadius.default}
        sx={{
          backdropFilter: "blur(16px)",
          background: theme.palette.background.appBar,
          zIndex: zIndex.appBar,
        }}>
        <ToggleButtonGroup buttons={pages} collapsible />
      </Stack>

      <Typography variant="h4" component="h1" textAlign="center" paddingTop={9}>
        <Trans
          i18nKey="home.pageTitle"
          context={location.pathname}
          components={{ highlight: <span style={{ color: theme.palette.primary.light }} /> }}
        />
      </Typography>

      <Outlet />
    </Stack>
  );
};

export default HomeLayout;
