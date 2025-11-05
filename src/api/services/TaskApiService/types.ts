import type { Task, TaskPriorityValues, TaskStatusValues } from 'types/task';
import type { infer as ZodInfer } from 'zod';
import type { CreateTaskSchema, UpdateTaskSchema } from './schemas';
import type { Nullable } from 'types/utils';

export type CreateTaskDto = ZodInfer<typeof CreateTaskSchema>;
export type UpdateTaskDto = ZodInfer<typeof UpdateTaskSchema>;

export interface ReorderTaskDto {
  nextTaskId: Nullable<string>;
  status: Task['status'];
}

export const SortBy = {
  CREATED_AT: 'createdAt',
  TITLE: 'title',
  STATUS: 'status',
  PRIORITY: 'priority',
} as const;

export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type StatusFilterValues = TaskStatusValues | 'all';
export type PriorityFilterValues = TaskPriorityValues | 'all';

export type TaskQueryParameters = {
  q?: string;
  searchBy?: string;

  sortBy?: string;
  order?: string;

  status?: string;
  priority?: string;

  page?: number;
  perPage?: number;
};

export type TaskCursorParams = {
  status: string;
  limit?: number;
  cursor: Nullable<string>;
};

export interface TaskCursorResponse {
  data: Task[];
  hasMore: boolean;
}
