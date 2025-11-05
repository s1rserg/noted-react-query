import { TaskPriority, type TaskPriorityValues } from 'types/task';
import type { SxProps } from '@mui/material';
import type { ChipStyle } from 'types/chips';

export const PriorityStyles: Record<TaskPriorityValues, ChipStyle> = {
  [TaskPriority.LOW]: {
    backgroundColor: 'secondary.main',
    color: 'secondary.contrastText',
  },
  [TaskPriority.MEDIUM]: {
    backgroundColor: 'warning.main',
    color: 'warning.contrastText',
  },
  [TaskPriority.HIGH]: {
    backgroundColor: 'error.main',
    color: 'error.contrastText',
  },
};

export const DescriptionStyles: SxProps = {
  mb: 2,
  height: '4.5em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
};

export const ButtonsStyles: SxProps = {
  display: 'flex',
  justifyContent: 'flex-end',
  p: 1,
  borderTop: '1px solid',
  borderColor: 'divider',
};
