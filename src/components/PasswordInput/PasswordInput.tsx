import { useState, type ReactElement } from 'react';
import {
  FormControl,
  type FormControlProps,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  type Control,
  type FieldValues,
  type Path,
  type UseFormClearErrors,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends FormControlProps {
  name: Path<T>;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  label: string;
  errorMsg?: string;
}

export const PasswordInput = <T extends FieldValues>({
  name,
  control,
  clearErrors,
  label,
  errorMsg,
  ...rest
}: Props<T>): ReactElement => {
  const { field, fieldState } = useController({ name, control });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl {...rest} variant="outlined" error={!!fieldState.error}>
      <InputLabel htmlFor={`${name}-field`}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        id={`${name}-field`}
        type={showPassword ? 'text' : 'password'}
        label={label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onFocus={() => clearErrors(name)}
      />
      {errorMsg && <FormHelperText>{errorMsg}</FormHelperText>}
    </FormControl>
  );
};
