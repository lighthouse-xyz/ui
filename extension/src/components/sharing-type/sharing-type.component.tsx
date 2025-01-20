import React from "react";

import { DropdownMenuWrapper } from "./sharing-type.style";
import { LocationSharingType } from "@src/common/graphql/generated/user.schema.graphql";
import DropdownMenu, { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";

interface Props {
  locationSharingType: LocationSharingType;
  setSharingType: (sharingType: LocationSharingType) => void;
}

const SharingType: React.FC<Props> = ({ locationSharingType, setSharingType }) => {
  const handleEditOptionClick = (option: string): void => {
    setSharingType(option as LocationSharingType);
  };

  return (
    <DropdownMenuWrapper>
      <DropdownMenu
        defaultOption={locationSharingType as string}
        menuOptions={[
          {
            option: LocationSharingType.friends,
            label: "With friends",
          },
          {
            option: LocationSharingType.friendsAndFollowers,
            label: "With friends & followers",
          },
          {
            option: LocationSharingType.allUsers,
            label: "With all Lighthouse users",
          },
        ]}
        buttonProps={{
          type: ButtonType.text,
          isOptionDisplayedAsBtnLabel: true,
          muiButtonProps: { variant: "contained" },
        }}
        onOptionClick={handleEditOptionClick}
      />
    </DropdownMenuWrapper>
  );
};

export default SharingType;
