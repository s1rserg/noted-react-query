import { useState, type Dispatch, type SetStateAction } from 'react';
import type { Task } from 'types/task';
import type { Nullable } from 'types/utils';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import type { TasksByStatus } from '../../types';
import {
  findTaskStatus,
  getNextTaskId,
  moveTaskBetweenColumns,
  reorderTaskInColumn,
} from './helpers';

export const useKanbanDnd = (
  tasks: TasksByStatus,
  setTasks: Dispatch<SetStateAction<TasksByStatus>>,
  handleReorderTask: (
    id: Task['id'],
    status: Task['status'],
    nextTaskId: Nullable<Task['id']>,
  ) => Promise<boolean>,
) => {
  const [activeTask, setActiveTask] = useState<Nullable<Task>>(null);
  const [originalTasks, setOriginalTasks] = useState<Nullable<TasksByStatus>>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { activeItem } = event.active.data.current as { activeItem: Task };
    setActiveTask(activeItem);
    setOriginalTasks(tasks);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    const fromStatus = findTaskStatus(activeId, tasks);

    const toStatus =
      (over.data.current?.columnId as Task['status']) ?? findTaskStatus(overId, tasks);

    if (!fromStatus || !toStatus) return;

    if (fromStatus === toStatus) {
      setTasks((prev) => {
        const result = reorderTaskInColumn(prev, fromStatus, activeId, overId);
        return result ? result.reorderedTasks : prev;
      });
      return;
    }
    setTasks((prev) => moveTaskBetweenColumns({ prev, activeId, fromStatus, toStatus, overId }));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;

    const pristineTasks = originalTasks;

    setActiveTask(null);
    setOriginalTasks(null);

    if (!pristineTasks) return;

    if (!over) {
      setTasks(pristineTasks);
      return;
    }

    const originalStatus = findTaskStatus(activeId, pristineTasks);
    if (!originalStatus) {
      setTasks(pristineTasks);
      return;
    }
    const originalNextTaskId = getNextTaskId(pristineTasks, originalStatus, activeId);

    const finalStatus = findTaskStatus(activeId, tasks);
    if (!finalStatus) {
      setTasks(pristineTasks);
      return;
    }
    const finalNextTaskId = getNextTaskId(tasks, finalStatus, activeId);

    const hasMoved = originalStatus !== finalStatus || originalNextTaskId !== finalNextTaskId;

    if (!hasMoved) return;

    const ok = await handleReorderTask(activeId, finalStatus, finalNextTaskId);

    if (!ok) {
      setTasks(pristineTasks);
    }
  };

  return { activeTask, handleDragStart, handleDragOver, handleDragEnd };
};
