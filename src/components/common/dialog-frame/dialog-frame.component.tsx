import React, { PropsWithChildren } from "react";

import { CloseButton, StyledDialog } from "./dialog-frame.style";
import { Box, Breakpoint, useTheme } from "@mui/material";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close-icon.svg";
import { borderRadius } from "@src/common/styles/style.const";
import useDialog from "@src/hooks/utils/use-dialog.hook";

interface Props {
  width?: Breakpoint;
  loading?: boolean;
  persistent?: boolean;
  notDismissable?: boolean;
  onClose?: () => void;
}

const DialogFrame: React.FC<PropsWithChildren<Props>> = ({
  children,
  width = "sm",
  loading = false,
  persistent = false,
  notDismissable = false,
  onClose,
}) => {
  const theme = useTheme();

  const { closeDialog } = useDialog();

  const handleClose = onClose || closeDialog;

  return (
    <StyledDialog open fullWidth maxWidth={width} onClose={persistent ? undefined : handleClose}>
      {!notDismissable && (
        <CloseButton disabled={loading} onClick={handleClose} width={width} data-testid="dialogframe-close-button">
          <CloseIcon />
        </CloseButton>
      )}
      <Box overflow="auto" borderRadius={borderRadius.default} bgcolor={theme.palette.background.default}>
        {children}
      </Box>
    </StyledDialog>
  );
};

export default DialogFrame;
