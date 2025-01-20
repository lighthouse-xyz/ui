import React from "react";

import IconButton from "@mui/material/IconButton";
import { ReactComponent as FlagIcon } from "@src/assets/icons/flag-icon.svg";
import paths from "@src/common/paths";
import useDialog from "@src/hooks/utils/use-dialog.hook";

interface Props {
  entityId: string;
  color?: "primary" | "secondary" | "inherit";
  size?: "small" | "large";
}

const ReportButton: React.FC<Props> = ({ entityId, color, size }) => {
  const { navigateToDialog } = useDialog();

  return (
    <IconButton
      color={color}
      size={size}
      onClick={() => navigateToDialog(paths.report, { entityId })}
      aria-label="report">
      <FlagIcon />
    </IconButton>
  );
};

export default ReportButton;
