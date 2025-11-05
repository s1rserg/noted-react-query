import { Step1DefaultValues } from './config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { type SignUpLocalDto } from 'api';
import { type FC } from 'react';
import { SignUpFormSchema } from './schemas';
import type { SignUpFormInput } from './types';
import { AppRoutes } from 'routes';
import { useTranslation } from 'react-i18next';
import { FormInput } from 'components/FormInput';
import { PasswordInput } from 'components/PasswordInput';
import { Link } from 'react-router-dom';
import { GoogleAuthButton } from 'components/GoogleAuthButton';
import { toast } from 'react-toastify';

interface Props {
  onSubmit: (authData: SignUpLocalDto) => Promise<boolean>;
  onGoogleSubmit: (credential: string) => Promise<void>;
  isLoading: boolean;
}

export const Step1Form: FC<Props> = ({ onSubmit, isLoading, onGoogleSubmit }) => {
  const { t } = useTranslation('registerPage');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: Step1DefaultValues,
    reValidateMode: 'onSubmit',
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    const { confirmPassword: _confirmPassword, ...dto } = data;
    if (await onSubmit(dto)) {
      reset();
    }
  });

  return (
    <>
      <Box component="form" onSubmit={(e) => void handleFormSubmit(e)} noValidate>
        <Stack spacing={2}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('step1.title')}
          </Typography>
          <Box component={Link} to={AppRoutes.LOGIN} sx={{ color: 'primary.main' }}>
            {t('step1.link')}
          </Box>
          <FormInput
            control={control}
            clearErrors={clearErrors}
            name="email"
            label={t('step1.labels.email')}
            fullWidth
            required
            margin="normal"
            errorMsg={t(errors.email?.message || '')}
          />
          <PasswordInput
            control={control}
            clearErrors={clearErrors}
            name="password"
            label={t('step1.labels.password')}
            fullWidth
            required
            margin="normal"
            errorMsg={t(errors.password?.message || '')}
          />
          <PasswordInput
            control={control}
            clearErrors={clearErrors}
            name="confirmPassword"
            label={t('step1.labels.confirmPassword')}
            fullWidth
            required
            margin="normal"
            errorMsg={t(errors.confirmPassword?.message || '')}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 2, py: 1.5 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('step1.buttons.continue')
            )}
          </Button>
        </Stack>
      </Box>
      <Divider sx={{ my: 2 }} />
      <GoogleAuthButton
        onSuccess={(credential) => void onGoogleSubmit(credential)}
        onError={() => toast.error(t('googleErrorMsg'))}
      />
    </>
  );
};
