import React from "react";

import { ReactComponent as EditIcon } from "../../../../../assets/icons/edit-icon.svg";
import IconButton from "@mui/material/IconButton";
import { Entity } from "@src/common/interfaces/entity.type";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { DialogType, getDialogPath } from "@src/utils/get-path.util";

interface Props {
  entity: Entity;
  btnColor: "primary" | "secondary";
}

const EditButton: React.FC<Props> = ({ entity, btnColor }) => {
  const { navigateToDialog } = useDialog();

  const dialogPath = getDialogPath(entity.type, DialogType.edit);

  return (
    <IconButton
      color={btnColor}
      aria-label="edit"
      onClick={() => {
        navigateToDialog(dialogPath, { entity });
      }}>
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
