import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { UserSidebarContainer } from "./user-sidebar.style";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { ReactComponent as CopyIcon } from "@src/assets/icons/copy-icon.svg";
import { ReactComponent as LogoutIcon } from "@src/assets/icons/logout-icon.svg";
import { ReactComponent as ProfileIcon } from "@src/assets/icons/profile-circle-icon.svg";
import { ReactComponent as SettingsIcon } from "@src/assets/icons/settings-icon.svg";
import { ReactComponent as StatusIcon } from "@src/assets/icons/status-icon.svg";
import { ReactComponent as AppearanceIcon } from "@src/assets/icons/sun-fog-icon.svg";
import { ColorMode } from "@src/common/enums/color-mode.enum";
import { Role } from "@src/common/graphql/generated/user.schema.graphql";
import { MenuOption } from "@src/common/interfaces/menu-option.interface";
import paths from "@src/common/paths";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import DropdownMenu, { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import Popper from "@src/components/common/popper/popper.component";
import ConnectionItem from "@src/components/connections/connection-item/connection-item.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useColorModeContext } from "@src/context/color-mode/color-mode-context";
import { useUserStateContext } from "@src/context/user-state/user-state-context";
import useAppearOffline from "@src/hooks/user/use-appear-offline.hook";
import useGetLocationStatus from "@src/hooks/user/use-get-location-status.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useFeatureFlag, { FeatureFlag } from "@src/hooks/utils/use-feature-flag.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { DocumentDownload, Graph } from "iconsax-react";
import { useInterval } from "usehooks-ts";

enum Status {
  appearOnline = "appearOnline",
  appearOffline = "appearOffline",
}

interface Props {
  userId: string;
  username: string;
  handle?: string;
  walletAddress?: string;
  image?: string;
  customStatus?: string;
  isOnline?: boolean;
}

const UserSidebar: React.FC<Props> = ({ userId, username, handle, walletAddress, image, customStatus, isOnline }) => {
  const pollIntervalInMs = 15000;

  const { isFeatureEnabled } = useFeatureFlag();
  const navigate = useNavigate();
  const { navigateToDialog } = useDialog();
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });

  const [yourAvatarPopperOpen, setYourAvatarPopperOpen] = useState(false);
  const { onboardingButtonDismissed, yourAvatarPopperDismissed } = useUserStateContext();
  const { colorMode, setColorMode } = useColorModeContext();
  const { logUserOut, hasRole } = useAuthContext();
  const { appearOffline } = useAppearOffline();
  const { data, refetch } = useGetLocationStatus({ userId });

  useInterval(() => refetch && void refetch(), pollIntervalInMs);

  const listOptions: MenuOption[] = [
    { option: paths.profile.buildPath(handle ?? userId), label: t("profile.myProfile"), icon: <ProfileIcon /> },
    ...conditionalItem(hasRole(Role.lightkeeper) && isFeatureEnabled(FeatureFlag.lightkeeperDashboard), {
      option: paths.lightkeeperStats,
      label: t("lightkeeperStats.label"),
      icon: <Graph variant="Outline" />,
    }),
    {
      option: "status",
      label: t("status.label"),
      icon: <StatusIcon />,
      submenu: [
        {
          option: isOnline ? Status.appearOffline : Status.appearOnline,
          label: isOnline ? t("status.appearOffline") : t("status.appearOnline"),
        },
        {
          option: paths.customStatus,
          label: t("status.custom"),
        },
      ],
    },
    {
      option: "appearance",
      label: t("appearance.label"),
      icon: <AppearanceIcon />,
      submenu: [
        {
          option: ColorMode.light,
          label: t("appearance.lightMode"),
        },
        {
          option: ColorMode.dark,
          label: t("appearance.darkMode"),
        },
        {
          option: ColorMode.system,
          label: t("appearance.system"),
        },
      ],
    },
    ...conditionalItem(!!walletAddress, {
      option: "copy-wallet-address",
      label: "",
      icon: (
        <CopyToClipboard
          activator={
            <Stack direction="row">
              <ListItemIcon>
                <CopyIcon />
              </ListItemIcon>
              <ListItemText primary={t("wallet.copyWalletAddress")} />
            </Stack>
          }
          content={walletAddress as string}
        />
      ),
    }),
    ...conditionalItem(!!onboardingButtonDismissed.value, {
      option: paths.claimAvatars,
      label: t("onboarding.claimAvatars.yourAvatars"),
      icon: <DocumentDownload />,
    }),
    { option: paths.settings, label: t("settings.label"), icon: <SettingsIcon /> },
    { option: "disconnect", label: t("cta.signOut"), icon: <LogoutIcon /> },
  ];

  const handleOptionClick = (option: string): void => {
    if (option.startsWith("/")) {
      option === paths.customStatus || option === paths.claimAvatars
        ? navigateToDialog(option, { userId, handle })
        : navigate(option);
    }
    if (option === "disconnect") {
      logUserOut();
    }

    if (option === Status.appearOffline || option === Status.appearOnline) {
      void appearOffline({
        variables: { input: { appearOffline: option === Status.appearOffline }, userId },
        onError: () => showToast(t("error.generic")),
      });
    }

    if (option === ColorMode.light || option === ColorMode.dark || option === ColorMode.system) {
      setColorMode(option);
    }
  };

  useEffect(() => {
    if (onboardingButtonDismissed.value && !yourAvatarPopperDismissed.value) {
      setYourAvatarPopperOpen(true);
    }
  }, [onboardingButtonDismissed.value]);

  const handleCloseYourAvatarPopper = (): void => {
    setYourAvatarPopperOpen(false);
    yourAvatarPopperDismissed.setValue(true);
  };

  return (
    <UserSidebarContainer>
      <ConnectionItem
        userId={userId}
        username={username}
        handle={handle}
        image={image}
        customStatus={customStatus}
        isOnline={isOnline}
        location={data?.locationStatus.lastLocation}
        displayOffline
        isCurrentUser
        action={
          <Popper
            title={t("onboarding.claimAvatars.popper.title")}
            content={t("onboarding.claimAvatars.popper.description")}
            action={{ content: t("cta.gotIt"), onClick: handleCloseYourAvatarPopper }}
            placement="bottom-end"
            sx={{ maxWidth: "238px" }}
            open={yourAvatarPopperOpen}>
            <DropdownMenu
              menuOptions={listOptions}
              menuProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                transformOrigin: { vertical: "top", horizontal: "right" },
                sx: { "& .MuiMenu-paper": { maxHeight: "100%" } },
              }}
              buttonProps={{
                type: ButtonType.text,
                muiButtonProps: {
                  color: "inherit",
                  className: "action-button-connection-item",
                },
              }}
              defaultOption={colorMode}
              onOptionClick={handleOptionClick}
            />
          </Popper>
        }
      />
    </UserSidebarContainer>
  );
};

export default UserSidebar;
