import type { Task } from 'types/task';
import type { TasksByStatus } from '../../types';

export interface MoveTaskBetweenColumnsParams {
  prev: TasksByStatus;
  activeId: string;
  fromStatus: Task['status'];
  toStatus: Task['status'];
  overId: string;
}
