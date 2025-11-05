import { Stack } from '@mui/material';
import { TaskItemSkeleton } from '../components';

export const ListViewSkeleton = () => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 8 }, (_, i) => i).map((i) => (
        <TaskItemSkeleton key={i} />
      ))}
    </Stack>
  );
};
