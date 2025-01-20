import React from "react";
import { useTranslation } from "react-i18next";

import ListItemText from "@mui/material/ListItemText";
import { ReactComponent as MoreIcon } from "@src/assets/icons/more-icon.svg";
import { Entity } from "@src/common/interfaces/entity.type";
import paths from "@src/common/paths";
import CopyToClipboard from "@src/components/common/copy-to-clipboard/copy-to-clipboard.component";
import DropdownMenu, { ButtonType } from "@src/components/common/dropdown-menu/dropdown-menu.component";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import conditionalItem from "@src/utils/conditional-item-in-array.util";
import { DialogType, getDialogPath, getEntityPath } from "@src/utils/get-path.util";

interface Props {
  entity: Entity;
  editMode?: boolean;
  includeShareToEditOptions?: boolean;
}

const MoreOptionsDropdownMenu: React.FC<Props> = ({ entity, editMode = false, includeShareToEditOptions = false }) => {
  const { t } = useTranslation();
  const { navigateToDialog } = useDialog();

  const shareOption = {
    option: "share",
    label: "",
    icon: (
      <CopyToClipboard
        activator={<ListItemText primary={t("cta.share")} />}
        content={getEntityPath(entity.type, entity.entityId)}
      />
    ),
  };

  const moreOptions = [shareOption, { option: "report", label: t("cta.report") }];

  const editOptions = [
    { option: DialogType.edit, label: t("cta.edit") },
    { option: DialogType.delete, label: t("cta.delete") },
    ...conditionalItem(includeShareToEditOptions, shareOption),
  ];

  const menuOptions = editMode ? editOptions : moreOptions;

  const handleOptionClick = (option: string): void => {
    if (option === "report") {
      navigateToDialog(paths.report, { entityId: entity.entityId });
    } else if (option === DialogType.edit || option === DialogType.delete) {
      navigateToDialog(getDialogPath(entity.type, option as DialogType), { entity });
    }
  };

  return menuOptions.length > 0 ? (
    <DropdownMenu
      menuOptions={editMode ? editOptions : moreOptions}
      menuProps={{
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
      }}
      buttonProps={{
        type: ButtonType.icon,
        icon: <MoreIcon />,
        muiButtonProps: { color: "primary", size: "large" },
      }}
      onOptionClick={handleOptionClick}
    />
  ) : null;
};

export default MoreOptionsDropdownMenu;
