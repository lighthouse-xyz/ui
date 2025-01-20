/* eslint-disable max-lines */
import React, { useEffect, useState } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { AutocompleteElement, DateTimePickerElement, TextFieldElement } from "react-hook-form-mui";

import {
  AutocompleteProps,
  CategoriesInputProps,
  DateTimePickerProps,
  FormControlProps,
  InputCreators,
  TagsInputProps,
  TextFieldProps,
} from "./use-create-form.interface";
import { getInputWithLabelAndHelper } from "./use-create-form.util";
import { Stack } from "@mui/material";
import { ReactComponent as CalendarIcon } from "@src/assets/icons/calendar-icon.svg";
import { ReactComponent as ChevronArrowDownIcon } from "@src/assets/icons/chevron-arrow-down-icon.svg";
import { ReactComponent as ChevronArrowLeftIcon } from "@src/assets/icons/chevron-arrow-left-icon.svg";
import { ReactComponent as ChevronArrowRightIcon } from "@src/assets/icons/chevron-arrow-right-icon.svg";
import ChipList from "@src/components/common/chip-list/chip-list.component";
import { isUrlInput, isUrlValid, UrlType } from "@src/utils/validate-url.util";

function createAutocompleteFactory<FormType extends FieldValues>({
  setValue,
}: FormControlProps<FormType>): <OptionsType>(props: AutocompleteProps<OptionsType>) => JSX.Element {
  return <OptionsType,>({
    varName,
    label,
    required = false,
    helper,
    placeholder,
    options,
    filterOptions,
    getOptionLabel,
    isOptionEqualToValue,
    loading = false,
    noOptionsText,
    onChange,
    onInputChange,
    renderOption,
    startAdornment,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ListboxProps,
  }: AutocompleteProps<OptionsType>): JSX.Element => {
    return getInputWithLabelAndHelper(
      <AutocompleteElement
        name={varName}
        required={required}
        options={options}
        loading={loading}
        autocompleteProps={{
          filterOptions,
          getOptionLabel,
          isOptionEqualToValue,
          noOptionsText,
          onChange,
          onInputChange: (event, newValue, reason) => {
            setValue(varName as Path<FormType>, null as PathValue<FormType, Path<FormType>>);
            !!onChange && onChange(event, null);
            !!onInputChange && onInputChange(event, newValue, reason);
          },
          renderOption,
          ListboxProps,
          clearOnBlur: false,
          forcePopupIcon: false,
        }}
        textFieldProps={{
          autoComplete: "off",
          placeholder,
          InputProps: { startAdornment },
        }}
      />,
      label,
      helper,
      required,
    );
  };
}

function createDateTimePickerFactory<FormType extends FieldValues>({
  theme,
}: FormControlProps<FormType>): (props: DateTimePickerProps) => JSX.Element {
  return ({ varName, label, required = false, disablePast = false, minDateTime }: DateTimePickerProps): JSX.Element => {
    return getInputWithLabelAndHelper(
      <DateTimePickerElement
        name={varName}
        required={required}
        disablePast={disablePast}
        format="MM/dd/yyyy h:mm a"
        label={label}
        minDateTime={minDateTime ? new Date(minDateTime) : undefined}
        slotProps={{
          popper: {
            sx: {
              "&& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
              },
            },
          },
        }}
        slots={{
          openPickerIcon: CalendarIcon,
          leftArrowIcon: ChevronArrowLeftIcon,
          rightArrowIcon: ChevronArrowRightIcon,
          switchViewIcon: ChevronArrowDownIcon,
        }}
        sx={{
          "& .MuiInputBase-root": {
            flexDirection: "row-reverse",
          },
        }}
      />,
    );
  };
}

function createCategoriesInputFactory<FormType extends FieldValues>({
  setValue,
  setError,
  clearErrors,
  isSubmitted,
  isSubmitting,
}: FormControlProps<FormType>): (props: CategoriesInputProps) => JSX.Element {
  return ({
    varName,
    label,
    helper,
    categoriesList,
    initialCategoriesSelected,
    required,
    maxSelected,
    disabled = false,
  }: CategoriesInputProps): JSX.Element => {
    const minSelected = required ? 1 : 0;

    const [categoriesSelected, setCategoriesSelected] = useState<string[]>(initialCategoriesSelected ?? []);

    useEffect(() => {
      setValue(varName as Path<FormType>, categoriesSelected as PathValue<FormType, Path<FormType>>);
      if (isSubmitted || isSubmitting) {
        if (categoriesSelected.length < minSelected) {
          setError(varName as Path<FormType>, { type: "min" });
        } else {
          clearErrors(varName as Path<FormType>);
        }
      }
    }, [isSubmitting, isSubmitted, categoriesSelected]);

    const isSelected = (category: string): boolean => {
      const value = Object.keys(categoriesList).find(key => categoriesList[key] === category);
      return value ? categoriesSelected.includes(value) : false;
    };

    const isDisabled = (category: string): boolean => {
      return (
        !isSelected(category) && ((minSelected !== maxSelected && categoriesSelected.length >= maxSelected) || disabled)
      );
    };

    const handleClick = (category: string): void => {
      const value = Object.keys(categoriesList).find(key => categoriesList[key] === category);
      if (value) {
        if (required && maxSelected === 1) {
          setCategoriesSelected([value]);
        } else {
          if (!isSelected(category) && categoriesSelected.length < maxSelected) {
            setCategoriesSelected([...categoriesSelected, value]);
          } else if (categoriesSelected.length > minSelected) {
            setCategoriesSelected(categoriesSelected.filter(c => c !== value));
          }
        }
      }
    };

    return getInputWithLabelAndHelper(
      <>
        <ChipList
          chips={Object.values(categoriesList)}
          isSelected={isSelected}
          isDisabled={isDisabled}
          onClick={!disabled ? handleClick : undefined}
        />
      </>,
      label,
      helper,
      required,
    );
  };
}

function createTagsInputFactory<FormType extends FieldValues>({
  getValues,
  setValue,
}: FormControlProps<FormType>): (props: TagsInputProps) => JSX.Element {
  return ({
    varName,
    label,
    required = false,
    helper,
    placeholder,
    maxTags,
    initialTags,
  }: TagsInputProps): JSX.Element => {
    const maxTagLength = 20;
    const [tags, setTags] = useState<string[]>(initialTags ?? []);
    const [input, setInput] = useState("");

    useEffect(() => {
      if (initialTags) {
        setTags(initialTags);
      }
    }, [initialTags]);

    useEffect(() => {
      setValue(varName as Path<FormType>, tags as PathValue<FormType, Path<FormType>>);
    }, [tags]);

    return getInputWithLabelAndHelper(
      <>
        <AutocompleteElement
          multiple
          name={varName}
          required={required}
          options={[]}
          autocompleteProps={{
            freeSolo: true,
            disabled: tags.length === maxTags,
            onChange: () => {
              if (tags.find(tag => tag.toLowerCase() === input.toLowerCase())) {
                setTags([...tags]);
              } else {
                const values = getValues(varName as Path<FormType>) as string[];
                setTags(values);
              }
            },
            onInputChange: (_event, inputValue) => setInput(inputValue),
            renderTags: () => null,
          }}
          textFieldProps={{
            autoComplete: "off",
            inputProps: { maxLength: maxTagLength },
            placeholder,
            InputProps: { endAdornment: null },
          }}
        />
        <ChipList
          chips={tags}
          onDelete={(tagToDelete: string) => {
            const newTags = tags.filter(tag => tag !== tagToDelete);
            setTags(newTags);
          }}
        />
      </>,
      label,
      helper,
      required,
    );
  };
}

function createTextFieldFactory<FormType extends FieldValues>({
  setError,
  clearErrors,
  t,
}: FormControlProps<FormType>): (props: TextFieldProps) => JSX.Element {
  return ({
    varName,
    label,
    required = false,
    helper,
    placeholder,
    initialCount,
    inputName = varName,
    leftIcon,
    maxLength,
    rows,
    placeholderAsLabel,
    ...props
  }: TextFieldProps): JSX.Element => {
    const [characterCount, setCharacterCount] = useState<number | undefined>(initialCount);

    useEffect(() => {
      if (initialCount) {
        setCharacterCount(initialCount);
      }
    }, [initialCount]);

    return getInputWithLabelAndHelper(
      <Stack direction="row" alignItems="center" spacing={2}>
        {leftIcon}
        <TextFieldElement
          name={varName}
          fullWidth
          id={`input-${inputName}`}
          required={required}
          label={placeholderAsLabel ? placeholder : undefined}
          placeholder={placeholderAsLabel ? undefined : placeholder}
          helperText={
            characterCount !== undefined && maxLength
              ? t("form.helper.characterCount", { count: characterCount, total: maxLength })
              : undefined
          }
          inputProps={{
            maxLength,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              characterCount !== undefined && setCharacterCount(event.target.value.length);
              if (isUrlInput(inputName) && event.target.value === "") {
                clearErrors(varName as Path<FormType>);
              }
            },
            onBlur: isUrlInput(inputName)
              ? (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  if (event.target.value !== "" && !isUrlValid(event.target.value, inputName as UrlType)) {
                    setError(varName as Path<FormType>, { message: `${t("error.invalidFormat")}` });
                  } else {
                    clearErrors(varName as Path<FormType>);
                  }
                }
              : undefined,
            ...props.inputProps,
          }}
          multiline={!!rows}
          rows={rows}
          {...props}
        />
      </Stack>,
      label,
      helper,
      required,
    );
  };
}

function inputCreatorsFactory<FormType extends FieldValues>(formProps: FormControlProps<FormType>): InputCreators {
  return {
    createAutocomplete: createAutocompleteFactory(formProps),
    createDateTimePicker: createDateTimePickerFactory(formProps),
    createCategoriesInput: createCategoriesInputFactory(formProps),
    createTagsInput: createTagsInputFactory(formProps),
    createTextField: createTextFieldFactory(formProps),
  };
}

export default inputCreatorsFactory;
