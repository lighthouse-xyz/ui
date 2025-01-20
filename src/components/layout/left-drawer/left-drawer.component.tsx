import React from "react";
import { useTranslation } from "react-i18next";

import { DrawerContainer, DrawerDivider } from "./left-drawer.style";
import LeftDrawerItem from "./left-drawer-item/left-drawer-item.component";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as ArchiveIcon } from "@src/assets/icons/archive-icon.svg";
import { ReactComponent as HeartIcon } from "@src/assets/icons/heart-icon.svg";
import { ReactComponent as HomeIcon } from "@src/assets/icons/home-icon.svg";
import { ReactComponent as MarkerIcon } from "@src/assets/icons/marker-icon.svg";
import { ReactComponent as NotificationIcon } from "@src/assets/icons/notification-icon.svg";
import paths from "@src/common/paths";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useStreamContext } from "@src/context/stream/stream-context";
import { useVrContext } from "@src/context/vr/vr-context";
import useLeftDrawer from "@src/hooks/utils/use-left-drawer.hook";

export interface PageItem {
  text: string;
  icon: JSX.Element;
  disabled?: boolean;
  paths?: string[];
  badgeCondition?: () => boolean;
}

const LeftDrawer: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const streamContext = useStreamContext();
  const { vrMode } = useVrContext();
  const { connected } = useAuthContext();
  const { width: leftDrawerWidth, collapsed: leftDrawerCollapsed } = useLeftDrawer();

  const mainPages: PageItem[] = [
    {
      text: t("home.label"),
      icon: <HomeIcon />,
      paths: [paths.home, paths.places, paths.events, paths.people],
    },
  ];
  let listPages: PageItem[] = mainPages;

  if (!vrMode) {
    const userPages: PageItem[] = [
      {
        text: t("notifications.label"),
        icon: <NotificationIcon />,
        disabled: !connected,
        paths: [paths.notifications],
        badgeCondition: () => streamContext.connectedToStream && streamContext.userHasUnseenNotifications,
      },
      {
        text: t("likes.label"),
        icon: <HeartIcon />,
        disabled: !connected,
        paths: [paths.likes],
      },
      {
        text: t("interested.label"),
        icon: <MarkerIcon />,
        disabled: !connected,
        paths: [paths.interested],
      },
      {
        text: t("jumpHistory.label"),
        icon: <ArchiveIcon />,
        disabled: !connected,
        paths: [paths.jumpHistory],
      },
    ];

    listPages = [...listPages, ...userPages];
  }

  return (
    <DrawerContainer
      width={leftDrawerWidth}
      elevation={0}
      square
      sx={{ borderRight: 1, borderRightColor: theme.palette.divider }}>
      <List disablePadding>
        {listPages.map((item, index) => (
          <div key={`left-drawer-item-${item.text}`}>
            <LeftDrawerItem item={item} leftDrawerCollapsed={leftDrawerCollapsed} />
            {!vrMode && index === mainPages.length - 1 && <DrawerDivider space="16px" />}
          </div>
        ))}
      </List>
    </DrawerContainer>
  );
};

export default LeftDrawer;
