import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, type UpdateUserDto } from 'api';
import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';
import { UpdateUserDataDefaultValues } from './config';

interface Props {
  onSubmit: (updateData: UpdateUserDto) => Promise<boolean>;
  onCancel: () => void;
  isLoading: boolean;
  initialData?: Partial<UpdateUserDto>;
  title?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
}

export const UpdateUserDataForm: FC<Props> = ({
  onSubmit,
  onCancel,
  isLoading,
  initialData,
  title,
  submitButtonText,
  cancelButtonText,
}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema) as Resolver<UpdateUserDto>,
    defaultValues: initialData || UpdateUserDataDefaultValues,
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const handleFormSubmit = handleSubmit(async (data: UpdateUserDto) => {
    if (await onSubmit(data)) {
      reset();
    }
  });

  return (
    <Box component="form" onSubmit={(e) => void handleFormSubmit(e)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="name"
          label={t('updateUserData.labels.name')}
          fullWidth
          autoComplete="given-name"
          margin="normal"
          errorMsg={t(errors['name']?.message || '')}
        />

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="surname"
          label={t('updateUserData.labels.surname')}
          fullWidth
          autoComplete="family-name"
          margin="normal"
          errorMsg={t(errors['surname']?.message || '')}
        />

        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="birthday"
          label={t('updateUserData.labels.birthday')}
          type="date"
          fullWidth
          margin="normal"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          errorMsg={t(errors['birthday']?.message || '')}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={onCancel}
            disabled={isLoading}
            sx={{ mt: 2, py: 1.5 }}
          >
            {cancelButtonText}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || !isDirty}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : submitButtonText}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
