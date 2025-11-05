import { CheckCircle, Circle, RadioButtonUnchecked } from '@mui/icons-material';
import type { ElementType } from 'react';
import { TaskStatus, type TaskStatusValues } from 'types/task';

export const StatusIcons: Record<TaskStatusValues, ElementType> = {
  [TaskStatus.PENDING]: RadioButtonUnchecked,
  [TaskStatus.IN_PROGRESS]: Circle,
  [TaskStatus.COMPLETED]: CheckCircle,
};
