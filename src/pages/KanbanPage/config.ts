import { TaskPriority, TaskStatus, type Task, type TaskPriorityValues } from 'types/task';

export const TaskStatusValues = Object.values(TaskStatus);

export const TaskPriorityLabels: Record<TaskPriorityValues, string> = {
  [TaskPriority.LOW]: 'priorityLabels.low',
  [TaskPriority.MEDIUM]: 'priorityLabels.medium',
  [TaskPriority.HIGH]: 'priorityLabels.high',
};

export const initialTasks = Object.fromEntries(
  TaskStatusValues.map((status) => [status, []]),
) as unknown as Record<Task['status'], Task[]>;
