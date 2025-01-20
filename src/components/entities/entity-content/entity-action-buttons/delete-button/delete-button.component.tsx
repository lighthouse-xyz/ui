import React from "react";

import IconButton from "@mui/material/IconButton";
import { ReactComponent as TrashIcon } from "@src/assets/icons/trash-icon.svg";
import { Entity } from "@src/common/interfaces/entity.type";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { DialogType, getDialogPath } from "@src/utils/get-path.util";

interface Props {
  entity: Entity;
  btnColor?: "primary" | "secondary";
}

const DeleteButton: React.FC<Props> = ({ entity, btnColor }) => {
  const { navigateToDialog } = useDialog();

  const dialogPath = getDialogPath(entity.type, DialogType.delete);

  return (
    <IconButton color={btnColor} aria-label="delete" onClick={() => navigateToDialog(dialogPath, { entity })}>
      <TrashIcon />
    </IconButton>
  );
};

export default DeleteButton;
