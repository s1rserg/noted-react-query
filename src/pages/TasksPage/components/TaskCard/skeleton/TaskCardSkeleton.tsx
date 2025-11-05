import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';
import { type FC } from 'react';

export const TaskCardSkeleton: FC = () => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width="80%" sx={{ fontSize: '1.5rem' }} />
        </Stack>

        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />

        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={100} height={24} />
        </Stack>
        <Stack direction="row" spacing={1} mt={1}>
          <Skeleton variant="rounded" width={60} height={22} />
          <Skeleton variant="rounded" width={60} height={22} />
        </Stack>
      </CardContent>

      <Box sx={{ mt: 'auto', p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </Card>
  );
};
