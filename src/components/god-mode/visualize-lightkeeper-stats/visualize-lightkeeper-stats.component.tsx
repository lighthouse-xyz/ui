import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { UserCategory } from "@src/common/graphql/generated/user.schema.graphql";
import paths from "@src/common/paths";
import useProfile, { buildGetProfileArgs } from "@src/hooks/user/use-profile.hook";
import { isUserHandle, isUserId } from "@src/utils/entity.util";
import { SearchNormal1 } from "iconsax-react";

const VisualizeLightkeeperStats: React.FC = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const navigate = useNavigate();

  const { getProfile } = useProfile();

  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleVisualize = (value: string): void => {
    setLoading(true);

    if (!(isUserId(value) || isUserHandle(value))) {
      setInputError(t("godMode.common.invalidInput"));
      setLoading(false);
      return;
    }

    void getProfile({
      variables: buildGetProfileArgs(value),
      onCompleted: data => {
        if (data.profile.category !== UserCategory.lightkeeper) {
          setInputError(t("godMode.visualizeLightkeeperStats.notLightkeeper"));
        } else {
          navigate(paths.godModeLightkeeperStats, { state: { profile: data.profile } });
        }
        setInputValue("");
        setLoading(false);
      },
      onError: () => {
        setInputError(t("godMode.common.noMatchingEntity"));
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Typography variant="h6">{t("godMode.visualizeLightkeeperStats.heading")}</Typography>
      <TextField
        placeholder={t("godMode.visualizeLightkeeperStats.inputPlaceholder")}
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
              <SearchNormal1 color={palette.primary.main} />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        variant="contained"
        size="large"
        loading={loading}
        disabled={inputValue.length === 0}
        onClick={() => handleVisualize(inputValue.trim())}>
        {t("godMode.visualizeLightkeeperStats.visualize")}
      </LoadingButton>
    </>
  );
};

export default VisualizeLightkeeperStats;
