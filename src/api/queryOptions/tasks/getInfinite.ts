import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import { QueryKeys } from '../../reactQuery';
import { taskApiService, type TaskCursorResponse } from '../../services';
import type { Task } from 'types/task';

export const getInfiniteTasksQueryOptions = (status: Task['status']) => {
  return infiniteQueryOptions({
    queryKey: [...QueryKeys.infiniteTasks, status],

    queryFn: async ({ pageParam, signal }) => {
      const requestConfig = taskApiService.findAllCursor({ status, cursor: pageParam }, signal);
      const response = await httpClient<TaskCursorResponse>(requestConfig);
      return response.data;
    },
    initialPageParam: null,
    placeholderData: keepPreviousData,

    getNextPageParam: (lastPage: TaskCursorResponse) => {
      if (!lastPage.hasMore) return undefined;

      const lastTask = lastPage.data.at(-1);
      if (!lastTask) return undefined;

      const nextCursor = btoa(
        JSON.stringify({
          id: lastTask.id,
        }),
      );
      return nextCursor;
    },
  });
};
