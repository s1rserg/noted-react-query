import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { TaskCursorResponse } from 'api';
import type { RefCallback } from 'react';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';

export interface SortActivatorProps {
  ref: RefCallback<HTMLElement>;
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}

export type TasksByStatus = Record<Task['status'], Task[]>;

export type PageInfo = {
  hasMore: boolean;
  isLoading: boolean;
};

export type ReorderVariables = {
  id: Task['id'];
  status: Task['status'];
  nextTaskId: Nullable<Task['id']>;
  oldStatus: Task['status'];
};

export type KanbanQueryResults = UseInfiniteQueryResult<
  InfiniteData<TaskCursorResponse, unknown>,
  Error
>[];
