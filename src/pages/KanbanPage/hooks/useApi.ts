import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { handleApiError, httpClient, taskApiService, type TaskCursorResponse } from 'api';
import type { Task } from 'types/task';
import type { TasksByStatus } from '../types';
import type { Nullable } from 'types/utils';

export const useApi = (setTasksByStatus: Dispatch<SetStateAction<TasksByStatus>>) => {
  const fetchTasks = useCallback(
    async (
      status: Task['status'],
      lastTask?: Task,
      signal?: AbortSignal,
    ): Promise<TaskCursorResponse> => {
      try {
        let cursor = null;
        if (lastTask) {
          cursor = btoa(
            JSON.stringify({
              id: lastTask.id,
            }),
          );
        }
        const requestConfig = taskApiService.findAllCursor({ status, cursor }, signal);
        const response = await httpClient<TaskCursorResponse>(requestConfig);

        setTasksByStatus((prev) => ({
          ...prev,
          [status]: [...(prev[status] || []), ...response.data.data],
        }));

        return response.data;
      } catch (error) {
        handleApiError(error);
        return { data: [], hasMore: false };
      }
    },
    [setTasksByStatus],
  );

  const handleReorderTask = useCallback(
    async (
      id: Task['id'],
      status: Task['status'],
      nextTaskId: Nullable<Task['id']>,
    ): Promise<boolean> => {
      try {
        await httpClient(taskApiService.reorder(id, { status, nextTaskId }));
        return true;
      } catch (error) {
        handleApiError(error);
        return false;
      }
    },
    [],
  );

  return { fetchTasks, handleReorderTask };
};
