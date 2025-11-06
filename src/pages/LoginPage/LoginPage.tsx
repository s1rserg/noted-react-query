import { type FC } from 'react';
import { type SignInLocalDto } from 'api';
import { localStorageService } from 'utils/LocalStorageService';
import { LoginForm } from './components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'routes';
import type { LocationState } from './types';
import { Box, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { GoogleAuthButton } from 'components/GoogleAuthButton';
import { useSignInMutation } from './hooks';
import { useGoogleAuthMutation } from 'hooks';
import type { Nullable } from 'types/utils';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('loginPage');

  const signInMutation = useSignInMutation();
  const googleAuthMutation = useGoogleAuthMutation();

  const state = location.state as Nullable<LocationState>;

  const handleLoginSubmit = async (data: SignInLocalDto): Promise<boolean> => {
    try {
      const response = await signInMutation.mutateAsync(data);
      localStorageService.setAccessToken(response.data.accessToken);
      void navigate(state?.from?.pathname || AppRoutes.TASKS, { replace: true });
      return true;
    } catch (_error) {
      return false;
    }
  };

  const handleGoogleAuth = (credential: string) => {
    googleAuthMutation.mutate(credential, {
      onSuccess: (response) => {
        localStorageService.setAccessToken(response.data.accessToken);
        void navigate(state?.from?.pathname || AppRoutes.TASKS, { replace: true });
      },
    });
  };

  return (
    <Box>
      <LoginForm onSubmit={handleLoginSubmit} isLoading={signInMutation.isPending} />
      <Divider sx={{ my: 2 }} />
      <GoogleAuthButton
        onSuccess={(credential) => void handleGoogleAuth(credential)}
        onError={() => toast.error(t('googleErrorMsg'))}
      />
    </Box>
  );
};
