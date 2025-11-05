import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import type { Task } from 'types/task';
import { DescriptionStyles, PriorityStyles } from './styles';
import { TaskPriorityLabels } from '../../config';
import { useTranslation } from 'react-i18next';
import type { SortActivatorProps } from '../../types';
import { mergeSortActivatorProps } from '../../utils';

interface Props {
  task: Task;
  sortActivatorProps?: SortActivatorProps;
}

export const Item: FC<Props> = ({ task, sortActivatorProps }) => {
  const { t } = useTranslation('kanbanPage');

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'grab' }}
      {...mergeSortActivatorProps(sortActivatorProps)}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5">{task.title}</Typography>
          <Chip label={t(TaskPriorityLabels[task.priority])} sx={PriorityStyles[task.priority]} />
          {task.deadline && <Chip label={task.deadline} />}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={DescriptionStyles}>
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
