import { Box } from '@mui/material';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';
import { type FC } from 'react';
import { useGetUser } from 'hooks';

export const MainLayout: FC = () => {
  useGetUser();

  return (
    <>
      <Header />
      <Box component="main" sx={{ px: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};
