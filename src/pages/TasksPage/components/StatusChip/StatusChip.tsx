import { Chip } from '@mui/material';
import { StatusIcons } from './config';
import { StatusStyles } from './styles';
import { TaskStatusLabels } from '../../config';
import { type TaskStatusValues } from 'types/task';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  status: TaskStatusValues;
}

export const StatusChip: FC<Props> = ({ status }) => {
  const { t } = useTranslation('tasksPage');

  const StatusIcon = StatusIcons[status];
  const style = StatusStyles[status];
  const label = t(TaskStatusLabels[status]);

  return (
    <Chip icon={<StatusIcon sx={{ '&&': { color: style.color } }} />} label={label} sx={style} />
  );
};
