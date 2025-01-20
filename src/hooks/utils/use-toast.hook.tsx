import React, { useId } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { usePrivy } from "@privy-io/react-auth";
import paths from "@src/common/paths";
import Alert from "@src/components/common/alert/alert.component";
import { resources } from "@src/locales/i18n";
import { SnackbarOrigin, useSnackbar } from "notistack";

export enum NoWalletToastContentType {
  nft = "nft",
  place = "place",
  event = "event",
}

export type VariantType = OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;

interface ToastAction {
  label?: string;
  onClick?: () => void;
  closeButton?: boolean;
}

interface ToastContent {
  title: string;
  message: string;
}

interface ToastOptions {
  variant?: VariantType;
  action?: ToastAction;
  hideAfter?: number;
  anchorOrigin?: SnackbarOrigin;
}

interface ToastUtilities {
  showToast: (content: ToastContent | string, options?: ToastOptions) => void;
  showNoWalletToast: (type?: NoWalletToastContentType) => void;
  showSignInToast: (feature: keyof typeof resources.en.common.warning.needToSignIn.subtitle) => void;
}

function useToast(defaultOptions?: ToastOptions): ToastUtilities {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const keyToast = useId();

  const { ready, login } = usePrivy();

  const getToast = (content: ToastContent | string, action?: ToastAction, variant?: VariantType): JSX.Element => {
    const messageOnly = typeof content === "string";

    return (
      <Alert
        elevation={1}
        color={variant}
        title={!messageOnly && content.title ? content.title : undefined}
        content={messageOnly ? content : content.message}
        action={
          !!action?.label && !!action.onClick
            ? {
                content: action.label,
                onClick: action.onClick,
              }
            : undefined
        }
        onClose={action?.closeButton ? () => closeSnackbar(keyToast) : undefined}
      />
    );
  };

  const showToast = (content: ToastContent | string, options?: ToastOptions): void => {
    enqueueSnackbar(
      getToast(content, options?.action ?? defaultOptions?.action, options?.variant ?? defaultOptions?.variant),
      {
        autoHideDuration: options?.hideAfter ?? defaultOptions?.hideAfter,
        anchorOrigin: options?.anchorOrigin ?? defaultOptions?.anchorOrigin,
        preventDuplicate: true,
        key: keyToast,
        persist: options?.action?.closeButton,
      },
    );
  };

  const showNoWalletToast = (type?: NoWalletToastContentType): void => {
    enqueueSnackbar(
      getToast(
        {
          title: t("error.noWalletTitle"),
          message: t("error.noWalletSubtitle", { context: type }),
        },
        {
          label: t("warning.noWalletUser.cta"),
          onClick: () => {
            navigate(paths.settings);
            closeSnackbar();
          },
          closeButton: true,
        },
        "warning",
      ),
      {
        persist: true,
        preventDuplicate: true,
        key: keyToast,
      },
    );
  };

  const showSignInToast = (feature: keyof typeof resources.en.common.warning.needToSignIn.subtitle): void => {
    enqueueSnackbar(
      getToast(
        {
          title: t("warning.needToSignIn.title"),
          message: t(`warning.needToSignIn.subtitle.${feature}`),
        },
        {
          label: t("cta.signIn"),
          onClick: () => {
            ready && login();
            closeSnackbar(keyToast);
          },
          closeButton: true,
        },
        "primary",
      ),
      {
        persist: true,
        preventDuplicate: true,
        key: keyToast,
      },
    );
  };

  return {
    showToast,
    showNoWalletToast,
    showSignInToast,
  };
}

export default useToast;
