import React, { useEffect, useMemo, useState } from "react";
import { DeepRequired, FieldError, FieldErrorsImpl, Merge, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EventFormData } from "../custom-event-dialog.component";
import { Autocomplete, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ReactComponent as LocationIcon } from "@src/assets/icons/location-icon.svg";
import { EntityType, Place, PlaceSortingMethod } from "@src/common/graphql/generated/discovery.schema.graphql";
import { defaultName } from "@src/common/interfaces/entity.type";
import Alert from "@src/components/common/alert/alert.component";
import WorldLogo from "@src/components/common/world-logo/world-logo.component";
import { useAuthContext } from "@src/context/auth/auth-context";
import { useLazyGetPlaces } from "@src/hooks/discovery/use-get-places.hook";
import useSearchEntities from "@src/hooks/discovery/use-search-entities.hook";
import { addRequiredAsterisk } from "@src/hooks/utils/use-create-form/use-create-form.util";
import debounce from "lodash.debounce";

interface Props {
  register: UseFormRegister<EventFormData>;
  setValue: (place: Place | null) => void;
  error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<Place>>>;
  initialPlace?: Place;
  godMode?: boolean;
}

const PlacePicker: React.FC<Props> = ({ register, setValue, error, initialPlace, godMode }) => {
  const maxPlaces = 10;
  const debounceLimit = 1000;
  const { t } = useTranslation();

  const [placeValue, setPlaceValue] = useState<Place | null>(initialPlace ?? null);
  const [placeInputValue, setPlaceInputValue] = useState(initialPlace?.name ?? "");

  const { profile, loading: profileLoading } = useAuthContext();

  const { getPlaces, results: ownedPlacesResults } = useLazyGetPlaces({
    first: maxPlaces,
    offset: 0,
    sort: PlaceSortingMethod.nameAsc,
  });
  const { searchEntities, results: searchResults } = useSearchEntities("", maxPlaces, 0, {
    types: [EntityType.estate, EntityType.parcel],
  });

  useEffect(() => {
    if (initialPlace) {
      setPlaceValue(initialPlace);
      setPlaceInputValue(initialPlace.name ?? defaultName);
      setValue(initialPlace);
    }
  }, [initialPlace]);

  useEffect(() => {
    if (!profileLoading && profile) {
      void getPlaces({ variables: { where: { ownerUser: profile.userId } } });
    }
  }, [profileLoading]);

  const search = useMemo(
    () =>
      debounce(
        (query: string) => {
          void searchEntities({ variables: { query } });
        },
        debounceLimit,
        { leading: true, trailing: true },
      ),
    [],
  );

  const getNoOptionsText = (): string => {
    if (placeInputValue) {
      return t(searchResults.error ? "error.loadResults" : "noResults.yourPlaces.title");
    } else {
      return t(ownedPlacesResults.error ? "error.loadSuggestions" : "form.placeholder.noPlaceTiedToWallet");
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h7">{addRequiredAsterisk(t("form.label.where"))}</Typography>
      <Autocomplete
        {...register("place", { required: t("error.required") })}
        value={placeValue}
        inputValue={placeInputValue}
        options={
          ((placeInputValue ? searchResults.data?.entities.list : ownedPlacesResults.data?.entities.list) ??
            []) as Place[]
        }
        filterOptions={options => options}
        getOptionLabel={option => option.name ?? defaultName}
        isOptionEqualToValue={(option, value) => option.entityId === value.entityId}
        loading={placeInputValue ? searchResults.loading : ownedPlacesResults.loading}
        noOptionsText={getNoOptionsText()}
        onChange={(_event, newValue) => {
          setPlaceValue(newValue);
          setValue(newValue);
          if (newValue) {
            search(newValue.name ?? defaultName);
          }
        }}
        onInputChange={(_event, newInputValue, reason) => {
          setPlaceInputValue(newInputValue);
          if (reason !== "reset" && newInputValue) {
            search(newInputValue);
          }
        }}
        renderOption={(props, option) => (
          <Stack
            component="li"
            {...props}
            key={option.entityId}
            direction="row"
            justifyContent="flex-start"
            spacing={4}>
            <WorldLogo world={option.world} />
            <span>{option.name}</span>
          </Stack>
        )}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={t("form.placeholder.place")}
            InputProps={{
              ...params.InputProps,
              startAdornment: placeValue ? <WorldLogo world={placeValue.world} /> : <LocationIcon />,
            }}
            error={!!error}
            helperText={error?.message}
            inputProps={{ ...params.inputProps, maxLength: 100 }}
          />
        )}
        ListboxProps={{ style: { maxHeight: "188px", overflow: "auto" } }}
        clearOnBlur={false}
        forcePopupIcon={false}
      />

      {!godMode && !!placeValue && !!profile && placeValue.ownerUser !== profile.userId && (
        <Alert
          severity="warning"
          title={t("warning.eventWithPlaceThatIsNotYours.title")}
          content={t("warning.eventWithPlaceThatIsNotYours.subtitle")}
        />
      )}
    </Stack>
  );
};

export default PlacePicker;
