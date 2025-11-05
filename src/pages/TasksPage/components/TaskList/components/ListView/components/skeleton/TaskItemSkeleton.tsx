import { Box, ListItemButton, Skeleton, Stack } from '@mui/material';
import { type FC } from 'react';

export const TaskItemSkeleton: FC = () => {
  return (
    <ListItemButton
      divider
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        mb: 1,
        p: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3} width="100%">
        <Box flexShrink={0} minWidth={120}>
          <Skeleton variant="rounded" width={100} height={24} />
        </Box>
        <Skeleton
          variant="text"
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            minWidth: 0,
            textAlign: 'center',
          }}
        ></Skeleton>

        <Skeleton
          variant="text"
          sx={{
            flexShrink: 0,
            width: '70%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        ></Skeleton>
      </Stack>
    </ListItemButton>
  );
};
