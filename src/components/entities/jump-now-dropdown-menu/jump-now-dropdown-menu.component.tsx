import React from "react";
import { useTranslation } from "react-i18next";

import { useApolloClient } from "@apollo/client";
import { JumpNowLocation } from "@src/common/graphql/generated/discovery.schema.graphql";
import { FriendListSortingMethod, Profile } from "@src/common/graphql/generated/user.schema.graphql";
import { MenuOption } from "@src/common/interfaces/menu-option.interface";
import { PaginatedList } from "@src/common/interfaces/query-results.interface";
import { totalConnectionsLimitForSidePanel } from "@src/common/styles/style.const";
import DropdownMenu, { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useVrContext } from "@src/context/vr/vr-context";
import useJumpNow from "@src/hooks/discovery/use-jump-now.hook";
import { getFriendsQuery } from "@src/hooks/user/use-get-connections.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { compatibleWorldsInVr } from "@src/utils/worlds.util";

const JumpNowDropdownMenu: React.FC = () => {
  const { t } = useTranslation();
  const { showToast } = useToast({ variant: "error" });
  const client = useApolloClient();

  const { vrMode } = useVrContext();
  const { connected, profile } = useAuthContext();
  const { getJumpNowLocation, loading } = useJumpNow();

  const jumpOptions: MenuOption[] = [
    { option: JumpNowLocation.featuredSpots, label: t("enum.jumpNowLocation.featuredSpots") },
    { option: JumpNowLocation.anywhere, label: t("enum.jumpNowLocation.anywhere") },
    ...conditionalItem(!vrMode, {
      option: JumpNowLocation.friends,
      label: t("enum.jumpNowLocation.friends"),
    }),
  ];

  const handleOptionClick = (optionSelected: string): void => {
    const location: JumpNowLocation = optionSelected as JumpNowLocation;

    void getJumpNowLocation({
      variables: {
        location,
        vrMode: location === JumpNowLocation.featuredSpots && vrMode ? true : undefined,
        worlds: location === JumpNowLocation.anywhere && vrMode ? compatibleWorldsInVr : undefined,
      },
      onCompleted: data => {
        window.open(data.jumpNow.url);
      },
      onError: () => {
        showToast(t("error.jump"));
      },
    });
  };

  const isOptionDisabled = (option: string): boolean => {
    let friendsWithLocation: Profile | undefined = undefined;
    if (option === JumpNowLocation.friends) {
      const friends: PaginatedList<Profile> | null = client.readQuery({
        query: getFriendsQuery,
        variables: {
          userId: profile?.userId,
          first: totalConnectionsLimitForSidePanel,
          sortBy: FriendListSortingMethod.isInWorld,
        },
      });
      friendsWithLocation = friends?.entities.list?.find(friend => !!friend.location);
    }

    return option === JumpNowLocation.friends && !friendsWithLocation;
  };

  return (
    <DropdownMenu
      key="jump-now-dropdown-menu"
      menuOptions={jumpOptions}
      menuProps={{
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
      }}
      buttonProps={{
        type: ButtonType.text,
        label: t("cta.jumpNow"),
        loading,
        muiButtonProps: { variant: connected || vrMode ? "contained" : "outlined", size: "large" },
      }}
      onOptionClick={handleOptionClick}
      isOptionDisabled={isOptionDisabled}
    />
  );
};

export default JumpNowDropdownMenu;
