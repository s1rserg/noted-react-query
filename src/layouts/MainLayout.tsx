import { Box } from '@mui/material';
import { Header } from 'components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, type FC } from 'react';
import { useUserStore } from 'store';
import { localStorageService } from 'utils/LocalStorageService';

export const MainLayout: FC = () => {
  const user = useUserStore((state) => state.user);
  const initUser = useUserStore((state) => state.initUser);

  const navigate = useNavigate();

  const accessToken = localStorageService.getAccessToken();

  useEffect(() => {
    if (!user && accessToken) {
      void initUser();
    }
  }, [user, accessToken, initUser, navigate]);

  return (
    <>
      <Header />
      <Box component="main" sx={{ px: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};
