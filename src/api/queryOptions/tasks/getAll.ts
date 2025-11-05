import { queryOptions } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import { QueryKeys } from '../../reactQuery';
import { type TaskQueryParameters, taskApiService } from '../../services';
import type { Task } from 'types/task';

export const getAllTasksQueryOptions = (queryParams: TaskQueryParameters) => {
  return queryOptions({
    queryKey: [...QueryKeys.tasks, queryParams],
    queryFn: async ({ signal }) => {
      const requestConfig = taskApiService.findAll(queryParams, signal);
      const response = await httpClient<Task[]>(requestConfig);
      return response.data;
    },
  });
};
