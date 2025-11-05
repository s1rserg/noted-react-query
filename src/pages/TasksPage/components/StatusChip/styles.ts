import type { ChipStyle } from 'types/chips';
import { TaskStatus, type TaskStatusValues } from 'types/task';

export const StatusStyles: Record<TaskStatusValues, ChipStyle> = {
  [TaskStatus.PENDING]: {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  },
  [TaskStatus.IN_PROGRESS]: {
    backgroundColor: 'info.main',
    color: 'info.contrastText',
  },
  [TaskStatus.COMPLETED]: {
    backgroundColor: '#5dd55d',
    color: 'success.contrastText',
  },
};
