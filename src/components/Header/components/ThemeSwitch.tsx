import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip, useColorScheme } from '@mui/material';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const ThemeSwitch: FC = () => {
  const { t } = useTranslation('header');

  const { mode, setMode } = useColorScheme();

  const isDark = mode === 'dark';

  return (
    <Tooltip title={t('buttons.theme')}>
      <IconButton onClick={() => setMode(isDark ? 'light' : 'dark')}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon color="action" />}
      </IconButton>
    </Tooltip>
  );
};
