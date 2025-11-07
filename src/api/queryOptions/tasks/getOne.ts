import { queryOptions } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import { QueryKeys } from '../../reactQuery';
import { taskApiService } from '../../services';
import type { Task } from 'types/task';

export const getOneTaskQueryOptions = (id: Task['id']) => {
  return queryOptions({
    queryKey: [...QueryKeys.task, id],
    queryFn: async ({ signal }) => {
      const requestConfig = taskApiService.findOne(id, signal);
      const response = await httpClient<Task>(requestConfig);
      return response.data;
    },
  });
};
