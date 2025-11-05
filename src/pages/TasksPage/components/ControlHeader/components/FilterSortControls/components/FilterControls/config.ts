import { TaskPriority, TaskStatus } from 'types/task';
import { TaskPriorityLabels, TaskStatusLabels } from '../../../../../../config';

export const StatusFilterOptions = [
  { value: 'all', label: 'statusOptions.all' },
  ...Object.values(TaskStatus).map((s) => ({
    value: s,
    label: TaskStatusLabels[s],
  })),
];

export const PriorityFilterOptions = [
  { value: 'all', label: 'priorityOptions.all' },
  ...Object.values(TaskPriority).map((p) => ({ value: p, label: TaskPriorityLabels[p] })),
];
