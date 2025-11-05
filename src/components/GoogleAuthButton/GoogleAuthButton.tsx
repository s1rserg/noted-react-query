import { type FC } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  onSuccess: (credential: string) => void;
  onError: () => void;
}

export const GoogleAuthButton: FC<Props> = ({ onSuccess, onError }) => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={({ credential }) => credential && onSuccess(credential)}
        onError={onError}
        theme={theme.palette.mode === 'dark' ? 'filled_black' : 'outline'}
        shape="rectangular"
        locale={i18n.language}
        useOneTap
        use_fedcm_for_button
        use_fedcm_for_prompt
      />
    </Box>
  );
};
