import { Grid } from '@mui/material';
import { TaskCard } from '../../../TaskCard';
import type { FC } from 'react';
import type { Task } from 'types/task';

interface Props {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onCompleteTask: (id: Task['id']) => Promise<void>;
  onDeleteTask: (id: Task['id']) => Promise<void>;
}

export const GridView: FC<Props> = ({ tasks, onEditTask, onCompleteTask, onDeleteTask }) => {
  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TaskCard
            task={task}
            onEdit={onEditTask}
            onComplete={onCompleteTask}
            onDelete={onDeleteTask}
          />
        </Grid>
      ))}
    </Grid>
  );
};
