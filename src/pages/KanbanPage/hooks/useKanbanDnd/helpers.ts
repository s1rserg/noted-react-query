import type { Task } from 'types/task';
import type { TasksByStatus } from '../../types';
import type { Nullable } from 'types/utils';
import { arrayMove } from '@dnd-kit/sortable';
import type { MoveTaskBetweenColumnsParams } from './types';

export const findTaskStatus = (
  taskId: string,
  taskSet: TasksByStatus,
): Task['status'] | undefined => {
  const statuses = Object.keys(taskSet) as Array<Task['status']>;
  return statuses.find((status) => (taskSet[status] ?? []).some((task) => task.id === taskId));
};

export const moveTaskBetweenColumns = ({
  prev,
  activeId,
  fromStatus,
  toStatus,
  overId,
}: MoveTaskBetweenColumnsParams): TasksByStatus => {
  const task = prev[fromStatus]?.find((t) => t.id === activeId);
  if (!task) return prev;

  const fromItems = (prev[fromStatus] ?? []).filter((t) => t.id !== activeId);

  const toItems = prev[toStatus] ?? [];
  const overTaskIndex = toItems.findIndex((t) => t.id === overId);
  const newIndex = overTaskIndex !== -1 ? overTaskIndex : toItems.length;

  const newToItems = [
    ...toItems.slice(0, newIndex),
    { ...task, status: toStatus },
    ...toItems.slice(newIndex),
  ];

  return {
    ...prev,
    [fromStatus]: fromItems,
    [toStatus]: newToItems,
  };
};

export const reorderTaskInColumn = (
  tasks: TasksByStatus,
  status: Task['status'],
  activeId: string,
  overId: string,
): {
  reorderedTasks: TasksByStatus;
  nextTaskId: Nullable<string>;
} | null => {
  const items = tasks[status] ?? [];
  const oldIdx = items.findIndex((t) => t.id === activeId);
  const newIdx = items.findIndex((t) => t.id === overId);

  if (oldIdx === newIdx) return null;

  const reorderedItems = arrayMove(items, oldIdx, newIdx);
  const nextTaskId = reorderedItems[newIdx + 1]?.id ?? null;

  const reorderedTasks = {
    ...tasks,
    [status]: reorderedItems,
  };

  return { reorderedTasks, nextTaskId };
};

export const getNextTaskId = (
  tasks: TasksByStatus,
  status: Task['status'],
  activeId: string,
): Nullable<string> => {
  const toItems = tasks[status] ?? [];
  const activeTaskIndex = toItems.findIndex((t) => t.id === activeId);
  return toItems[activeTaskIndex + 1]?.id ?? null;
};
