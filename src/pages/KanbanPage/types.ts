import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { RefCallback } from 'react';
import type { Task } from 'types/task';

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
