import {
  TaskPriority,
  TaskStatus,
  type TaskPriorityValues,
  type TaskStatusValues,
} from 'types/task';

export const TaskStatusLabels: Record<TaskStatusValues, string> = {
  [TaskStatus.PENDING]: 'statusOptions.pending',
  [TaskStatus.IN_PROGRESS]: 'statusOptions.in_progress',
  [TaskStatus.COMPLETED]: 'statusOptions.completed',
};

export const TaskPriorityLabels: Record<TaskPriorityValues, string> = {
  [TaskPriority.LOW]: 'priorityOptions.low',
  [TaskPriority.MEDIUM]: 'priorityOptions.medium',
  [TaskPriority.HIGH]: 'priorityOptions.high',
};
