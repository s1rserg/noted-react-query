import { Box, ListItemButton, Stack, Typography } from '@mui/material';
import { StatusChip } from '../../../../StatusChip';
import { type FC } from 'react';
import { type Task } from 'types/task';

interface Props {
  task: Task;
  onClick: (id: Task['id']) => void;
}

export const TaskItem: FC<Props> = ({ task, onClick }) => {
  return (
    <ListItemButton
      divider
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        mb: 1,
        p: 3,
      }}
      onClick={() => onClick(task.id)}
    >
      <Stack direction="row" alignItems="center" spacing={3} width="100%">
        <Box flexShrink={0} minWidth={120}>
          <StatusChip status={task.status} />
        </Box>
        <Typography
          variant="h5"
          noWrap
          sx={{
            flexGrow: 1,
            flexShrink: 1,
            minWidth: 0,
            textAlign: 'center',
          }}
        >
          {task.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{
            flexShrink: 0,
            maxWidth: '70%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {task.description}
        </Typography>
      </Stack>
    </ListItemButton>
  );
};
