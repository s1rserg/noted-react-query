import { TextField, type TextFieldProps } from '@mui/material';
import {
  type Control,
  type FieldValues,
  type Path,
  type UseFormClearErrors,
  useController,
} from 'react-hook-form';
import type { ReactElement } from 'react';

interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  errorMsg?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  clearErrors,
  helperText: originalHelperText,
  errorMsg,
  ...rest
}: Props<T>): ReactElement => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <TextField
      {...rest}
      {...field}
      value={field.value || ''}
      error={!!fieldState.error}
      helperText={errorMsg || originalHelperText}
      onFocus={() => clearErrors(name)}
    />
  );
};
