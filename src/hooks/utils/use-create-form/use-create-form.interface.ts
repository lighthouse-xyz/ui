import { AutocompleteInputChangeReason, AutocompleteRenderOptionState, Theme } from "@mui/material";
import { TFunction } from "i18next";
import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { TextFieldElementProps } from "react-hook-form-mui";

export interface FormControlProps<FormType extends FieldValues> {
  control: Control<FormType, object>;
  isSubmitted: boolean;
  isSubmitting: boolean;
  errors: FieldErrorsImpl<DeepRequired<FormType>>;
  getValues: UseFormGetValues<FormType>;
  setValue: UseFormSetValue<FormType>;
  setError: UseFormSetError<FormType>;
  clearErrors: UseFormClearErrors<FormType>;
  t: TFunction<"common", undefined>;
  theme: Theme;
}

interface BaseInputProps {
  varName: string;
  label?: string;
  required?: boolean;
}

interface TextInputProps extends BaseInputProps {
  helper?: string | React.ReactElement;
  placeholder?: string;
}

export interface AutocompleteProps<OptionsType> extends TextInputProps {
  options: OptionsType[];
  filterOptions?: (options: OptionsType[]) => OptionsType[];
  getOptionLabel?: (option: OptionsType) => string;
  isOptionEqualToValue?: (option: OptionsType, value: OptionsType) => boolean;
  loading?: boolean;
  noOptionsText?: string;
  onChange?: (event: React.SyntheticEvent<Element, Event>, newValue: OptionsType | null) => void;
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: OptionsType,
    state: AutocompleteRenderOptionState,
  ) => React.ReactNode;
  startAdornment?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ListboxProps?: React.HTMLAttributes<HTMLUListElement>;
}

export interface CategoriesInputProps extends TextInputProps {
  categoriesList: Record<string, string>;
  initialCategoriesSelected?: string[];
  maxSelected: number;
  disabled?: boolean;
}

export interface DateTimePickerProps extends BaseInputProps {
  defaultValue: Date;
  disablePast?: boolean;
  minDateTime?: Date;
}

export interface TagsInputProps extends TextInputProps {
  maxTags: number;
  initialTags?: string[];
}

export interface TextFieldProps extends TextInputProps, Omit<TextFieldElementProps, "label" | "name"> {
  initialCount?: number;
  inputName?: string;
  leftIcon?: JSX.Element;
  maxLength?: number;
  rows?: number;
  placeholderAsLabel?: boolean;
}

export interface InputCreators {
  createAutocomplete: <OptionsType>(props: AutocompleteProps<OptionsType>) => JSX.Element;
  createCategoriesInput: (props: CategoriesInputProps) => JSX.Element;
  createDateTimePicker: (props: DateTimePickerProps) => JSX.Element;
  createTagsInput: (props: TagsInputProps) => JSX.Element;
  createTextField: (props: TextFieldProps) => JSX.Element;
}
