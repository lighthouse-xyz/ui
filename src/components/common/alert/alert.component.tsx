import React from "react";

import { Alert as MuiAlert, AlertProps, AlertTitle, Box, Button, ButtonProps, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close-icon.svg";
import { ReactComponent as ErrorIcon } from "@src/assets/icons/error-icon.svg";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info-circle-icon.svg";
import { ReactComponent as SuccessIcon } from "@src/assets/icons/tick-circle-icon.svg";
import { ReactComponent as WarningIcon } from "@src/assets/icons/warning-icon.svg";

interface ActionProps extends Omit<ButtonProps, "content"> {
  content: string | JSX.Element;
  position?: "bottom" | "right";
}

interface Props extends Omit<AlertProps, "action" | "content"> {
  content?: string | JSX.Element;
  action?: ActionProps;
}

// eslint-disable-next-line complexity
const Alert: React.FC<Props> = ({ content, title, action, icon, ...props }) => {
  const { palette } = useTheme();

  const lightMode = palette.mode === "light";

  const severity = props.severity || (props.color === "primary" || props.color === "neutral" ? "info" : props.color);
  const color = props.color || props.severity || "success";

  const mapColorIcon = {
    ["info"]: lightMode ? palette.info.shades?.["160p"] : palette.info.main,
    ["primary"]: lightMode ? palette.primary.dark : palette.primary.main,
    ["error"]: lightMode ? palette.error.shades?.["160p"] : palette.error.main,
    ["success"]: lightMode ? palette.success.shades?.["160p"] : palette.success.main,
    ["warning"]: lightMode ? palette.warning.shades?.["160p"] : palette.warning.main,
    ["neutral"]: palette.neutral?.main,
  };

  const mapColorContent = {
    ["info"]: palette.info.shades?.["160p"],
    ["primary"]: lightMode ? palette.primary.dark : palette.primary.light,
    ["error"]: palette.error.shades?.["160p"],
    ["success"]: palette.success.shades?.["160p"],
    ["warning"]: palette.warning.shades?.["160p"],
    ["neutral"]: palette.neutral?.main,
  };

  const mapColorBg = {
    ["info"]: palette.info.shades?.["190p"],
    ["primary"]: palette.primary.shades?.["190p"],
    ["error"]: palette.error.shades?.["190p"],
    ["success"]: palette.success.shades?.["190p"],
    ["warning"]: palette.warning.shades?.["190p"],
    ["neutral"]: palette.neutral?.shades?.["4p"],
  };

  const defaultVariant = props.variant === "standard" || !props.variant;
  const colorContent = defaultVariant ? mapColorContent[color] : undefined;
  const colorBg = defaultVariant ? mapColorBg[color] : undefined;
  const colorIcon = defaultVariant ? mapColorIcon[color] : undefined;

  const iconMapping = {
    info: <InfoIcon color={colorIcon} />,
    primary: <InfoIcon color={colorIcon} />,
    error: <ErrorIcon color={colorIcon} />,
    success: <SuccessIcon color={colorIcon} />,
    warning: <WarningIcon color={colorIcon} />,
  };

  const actionPosition = action?.position || "right";
  const rightAction = !!action && actionPosition === "right";
  const bottomAction = !!action && actionPosition === "bottom";
  const actionAsString = typeof action?.content === "string";
  const justifyContentAction = bottomAction && !!props.onClose ? "flex-start" : "flex-end";
  const closeIconProps = { width: "20px", height: "20px", color: colorContent };

  const getCloseButton = (): JSX.Element => {
    return (
      <Box position="relative">
        <IconButton
          size="small"
          color="inherit"
          onClick={props.onClose}
          sx={
            !rightAction && !!props.onClose
              ? { position: "absolute", alignSelf: "flex-end", right: "0px", top: "0px" }
              : undefined
          }>
          <CloseIcon {...closeIconProps} />
        </IconButton>
      </Box>
    );
  };

  const getActions = (): JSX.Element => {
    let muiButtonProps;
    if (action) {
      const { content: _content, position: _position, ...buttonProps } = action;
      muiButtonProps = buttonProps;
    }

    return (
      <Stack direction="row" justifyContent={justifyContentAction}>
        {!!action?.content &&
          (actionAsString ? (
            <Button color="inherit" size="small" {...muiButtonProps}>
              {action.content}
            </Button>
          ) : (
            <>{action.content}</>
          ))}
        {!!props.onClose && rightAction && getCloseButton()}
      </Stack>
    );
  };

  return (
    <MuiAlert
      iconMapping={iconMapping}
      icon={icon ? <Box color={colorIcon}>{icon}</Box> : icon}
      action={(rightAction && getActions()) || (!!props.onClose && bottomAction && getCloseButton()) || undefined}
      color={color}
      severity={severity}
      slots={{ closeIcon: CloseIcon }}
      slotProps={{ closeIcon: { style: closeIconProps } }}
      sx={{
        backgroundColor: colorBg,
        ".MuiAlert-icon": {
          alignSelf: !title ? "center" : undefined,
        },
        ".MuiAlert-message": {
          minWidth: bottomAction && !icon && !props.onClose ? "100%" : undefined,
        },
        ...props.sx,
      }}
      {...props}>
      {!!title && <AlertTitle>{title}</AlertTitle>}
      <Stack spacing={2}>
        <Box width="100%">{content}</Box>
        {bottomAction && getActions()}
      </Stack>
    </MuiAlert>
  );
};

export default Alert;
