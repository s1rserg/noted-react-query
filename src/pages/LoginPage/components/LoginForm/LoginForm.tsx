import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SignInLocalSchema, type SignInLocalDto } from 'api';
import { type FC } from 'react';
import { AppRoutes } from 'routes';
import { FormDefaultValues } from './config';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';
import { PasswordInput } from 'components/PasswordInput';
import { Link } from 'react-router-dom';

interface Props {
  onSubmit: (authData: SignInLocalDto) => Promise<boolean>;
  isLoading: boolean;
}

export const LoginForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation('loginPage');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<SignInLocalDto>({
    resolver: zodResolver(SignInLocalSchema),
    defaultValues: FormDefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    if (await onSubmit(data)) {
      reset();
    }
  });

  return (
    <Box component="form" onSubmit={(e) => void handleFormSubmit(e)} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('title')}
        </Typography>
        <Box component={Link} to={AppRoutes.REGISTER} sx={{ color: 'primary.main' }}>
          {t('link')}
        </Box>
        <FormInput
          control={control}
          clearErrors={clearErrors}
          name="email"
          label={t('labels.email')}
          fullWidth
          required
          margin="normal"
          autoComplete="email"
          errorMsg={t(errors.email?.message || '')}
        />

        <PasswordInput
          control={control}
          clearErrors={clearErrors}
          name="password"
          label={t('labels.password')}
          fullWidth
          required
          margin="normal"
          errorMsg={t(errors.password?.message || '')}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ mt: 2, py: 1.5 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : t('buttons.continue')}
        </Button>
      </Stack>
    </Box>
  );
};
