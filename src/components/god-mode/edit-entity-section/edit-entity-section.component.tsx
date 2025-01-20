import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import paths from "@src/common/paths";
import { useLazyGetEntity } from "@src/hooks/discovery/use-get-entity.hook";
import useProfile, { buildGetProfileArgs } from "@src/hooks/user/use-profile.hook";
import useDialog from "@src/hooks/utils/use-dialog.hook";
import { isEntityId, isEstateId, isEventId, isParcelId, isUserHandle } from "@src/utils/entity.util";
import { SearchNormal1 } from "iconsax-react";

const EditEntitySection: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { navigateToDialog } = useDialog();

  const { getEntity } = useLazyGetEntity();
  const { getProfile } = useProfile();

  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleRetrieveEntity = (value: string): void => {
    setLoading(true);

    if (!(isEntityId(value) || isUserHandle(value))) {
      setInputError(t("godMode.common.invalidInput"));
      setLoading(false);
      return;
    }

    if (isEventId(value)) {
      void getEntity({
        variables: { id: value },
        onCompleted: data => {
          navigateToDialog(paths.godModeEditEvent, { entity: data.entity });
          setInputValue("");
          setLoading(false);
        },
        onError: () => {
          setInputError(t("godMode.common.noMatchingEntity"));
          setLoading(false);
        },
      });
    } else if (isParcelId(value) || isEstateId(value)) {
      void getEntity({
        variables: { id: value },
        onCompleted: data => {
          navigateToDialog(paths.godModeEditPlace, { entity: data.entity, godMode: true });
          setInputValue("");
          setLoading(false);
        },
        onError: () => {
          setInputError(t("godMode.common.noMatchingEntity"));
          setLoading(false);
        },
      });
    } else {
      void getProfile({
        variables: buildGetProfileArgs(value),
        onCompleted: data => {
          navigateToDialog(paths.godModeEditGate, { gate: data.profile });
          setInputValue("");
          setLoading(false);
        },
        onError: () => {
          setInputError(t("godMode.common.noMatchingEntity"));
          setLoading(false);
        },
      });
    }
  };

  return (
    <>
      <Typography variant="h6">{t("godMode.edit.heading")}</Typography>
      <TextField
        placeholder={t("godMode.edit.inputPlaceholder")}
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value);
          setInputError(undefined);
        }}
        disabled={loading}
        error={!!inputError}
        helperText={inputError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchNormal1 color={theme.palette.primary.main} />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        variant="contained"
        size="large"
        loading={loading}
        disabled={inputValue.length === 0}
        onClick={() => handleRetrieveEntity(inputValue.trim())}>
        {t("godMode.edit.retrieve")}
      </LoadingButton>
    </>
  );
};

export default EditEntitySection;
