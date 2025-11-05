import { Stack } from '@mui/material';
import { TaskItem } from './components';
import type { FC } from 'react';
import type { Task } from 'types/task';

interface Props {
  tasks: Task[];
  onTaskClick: (id: Task['id']) => void;
}

export const ListView: FC<Props> = ({ tasks, onTaskClick }) => {
  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </Stack>
  );
};
