import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ApolloError } from "@apollo/client";
import { Stack, TextField, Typography } from "@mui/material";
import paths from "@src/common/paths";
import DialogFrame from "@src/components/common/dialog-frame/dialog-frame.component";
import FormConfirmationButtons from "@src/components/common/form-confirmation-buttons/form-confirmation-buttons.component";
import useCreateEmptyProfile from "@src/hooks/user/use-create-empty-profile.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import useToast from "@src/hooks/utils/use-toast.hook";
import Web3 from "web3";

const AddGateDialog: React.FC = () => {
  const { closeDialog, navigateToDialog } = useDialog();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { createEmptyProfile, loading } = useCreateEmptyProfile();

  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | undefined>(undefined);

  const walletAlreadyExists = (errorObject: ApolloError): boolean => {
    const userAlreadyExistsError = errorObject.graphQLErrors?.find(
      ({ extensions }) => extensions?.code === "USER_ALREADY_EXISTS",
    );

    if (userAlreadyExistsError) {
      setInputError(t("godMode.form.walletAddressAlreadyExists"));
      return true;
    }

    return false;
  };

  const handleClick = (value: string): void => {
    if (!value || !Web3.utils.isAddress(value)) {
      setInputError(t("godMode.form.invalidWalletAddress"));
      return;
    }

    void createEmptyProfile({
      variables: { input: { walletAddress: Web3.utils.toChecksumAddress(value) } },
      onCompleted: data => {
        showToast(t("godMode.create.success"), { variant: "success" });
        navigateToDialog(paths.godModeEditGate, { gate: data.createEmptyProfile });
      },
      onError: error => !walletAlreadyExists(error) && showToast(t("error.generic"), { variant: "error" }),
    });
  };

  return (
    <DialogFrame persistent>
      <Stack padding={6} paddingBottom={0}>
        <Typography variant="h6" marginBottom={4}>
          {t("godMode.create.addGate")}
        </Typography>

        <TextField
          label={t("godMode.form.walletAddress")}
          value={inputValue}
          onChange={event => {
            setInputValue(event.target.value);
            setInputError(undefined);
          }}
          disabled={loading}
          error={!!inputError}
          helperText={inputError}
        />

        <FormConfirmationButtons
          cancelButtonProps={{ onClick: closeDialog }}
          confirmButtonProps={{
            label: t("godMode.create.addGate"),
            onClick: () => handleClick(inputValue.trim()),
            loading,
            disabled: inputValue.length === 0 || !!inputError,
          }}
        />
      </Stack>
    </DialogFrame>
  );
};

export default AddGateDialog;
