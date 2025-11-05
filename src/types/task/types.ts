import type { ValueOf } from '../utils';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatusValues;
  priority: TaskPriorityValues;
  tags?: string[];
  position: number;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
};

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

export type TaskPriorityValues = ValueOf<typeof TaskPriority>;
export type TaskStatusValues = ValueOf<typeof TaskStatus>;
