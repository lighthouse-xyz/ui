import {
  DeepPartial,
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  useForm,
  UseFormReset,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import inputCreatorsFactory from "./use-create-form.factory";
import { InputCreators } from "./use-create-form.interface";
import { useTheme } from "@mui/material";

function useCreateForm<FormType extends FieldValues>(
  initialState?: DeepPartial<FormType>,
): {
  formContext: UseFormReturn<FormType, object>;
  errors: FieldErrorsImpl<DeepRequired<FormType>>;
  resetForm: UseFormReset<FormType>;
  watch: UseFormWatch<FormType>;
  inputCreators: InputCreators;
} {
  const { t } = useTranslation();

  const theme = useTheme();

  const formContext = useForm<FormType>({ defaultValues: initialState });
  const {
    control,
    getValues,
    setValue,
    reset: resetForm,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
    clearErrors,
    watch,
  } = formContext;

  const inputCreators = inputCreatorsFactory({
    control,
    isSubmitted,
    isSubmitting,
    errors,
    getValues,
    setValue,
    setError,
    clearErrors,
    t,
    theme,
  });

  return { formContext, errors, resetForm, watch, inputCreators };
}

export { useCreateForm };
