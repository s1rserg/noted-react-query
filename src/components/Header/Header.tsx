import { Box, Divider } from '@mui/material';
import { HeaderNavIcon, Logo, ThemeSwitch, UserPopover } from './components';
import type { FC } from 'react';
import { LanguageSwitch } from './components/LanguageSwitch';

export const Header: FC = () => {
  return (
    <Box component="header">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HeaderNavIcon />
          <ThemeSwitch />
          <LanguageSwitch />
          <UserPopover />
        </Box>
      </Box>

      <Divider />
    </Box>
  );
};
