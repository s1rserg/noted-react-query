import { Box, CircularProgress } from '@mui/material';
import type { FC } from 'react';

export const Loader: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
