import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useTheme } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search-icon.svg";
import paths from "@src/common/paths";

const SearchBar: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [value, setValue] = useState<string | null>(searchParams.get("query") ?? null);
  const [inputValue, setInputValue] = useState<string>(searchParams.get("query") ?? "");

  const handleValueChange = (_event: React.SyntheticEvent<Element, Event>, newValue: string | null): void => {
    const trimmedValue = newValue ? newValue.trim() : null;
    setValue(trimmedValue);
    if (trimmedValue) {
      navigate({ pathname: paths.search, search: `?${createSearchParams({ query: trimmedValue }).toString()}` });
    }
  };

  const handleInputChange = (_event: React.SyntheticEvent<Element, Event>, newInputValue: string): void => {
    setInputValue(newInputValue);
  };

  useEffect(() => {
    if (
      !location.pathname.startsWith(paths.search) &&
      !(location.state as { backgroundLocation?: Location })?.backgroundLocation
    ) {
      setValue(null);
      setInputValue("");
    }
  }, [location]);

  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={handleValueChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onKeyDown={e => e.key === "Enter" && inputValue === "" && navigate(paths.home)}
      options={[].map(option => option)}
      renderInput={inputParams => (
        <TextField
          {...inputParams}
          placeholder={t("form.placeholder.search")}
          inputProps={{
            ...inputParams.inputProps,
            maxLength: 100,
          }}
          InputProps={{
            ...inputParams.InputProps,
            startAdornment: <SearchIcon style={{ color: theme.palette.primary.main }} />,
          }}
        />
      )}
    />
  );
};

export default SearchBar;
