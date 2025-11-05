import { useCallback, type Dispatch, type SetStateAction } from 'react';
import type { Task } from 'types/task';
import type { PageInfo } from '../types';

export const useKanbanPagination = (
  tasks: Record<Task['status'], Task[]>,
  pageInfo: Record<Task['status'], PageInfo>,
  setPageInfo: Dispatch<SetStateAction<Record<Task['status'], PageInfo>>>,
  fetchTasks: (status: Task['status'], lastTask?: Task) => Promise<{ hasMore: boolean }>,
) => {
  const handleLoadMore = useCallback(
    async (status: Task['status']) => {
      const { isLoading, hasMore } = pageInfo[status] || {};
      if (isLoading || !hasMore) return;

      setPageInfo((prev) => ({
        ...prev,
        [status]: { ...prev[status], isLoading: true },
      }));

      const columnTasks = tasks[status] || [];
      const lastTask = columnTasks.at(-1);

      const response = await fetchTasks(status, lastTask);
      setPageInfo((prev) => ({
        ...prev,
        [status]: { hasMore: response.hasMore, isLoading: false },
      }));
    },
    [fetchTasks, pageInfo, setPageInfo, tasks],
  );

  return { handleLoadMore };
};
