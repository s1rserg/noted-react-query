import { useQuery } from '@tanstack/react-query';
import { getOneTaskQueryOptions } from 'api';
import type { Task } from 'types/task';

export const useGetOneTask = (id: Task['id']) => {
  const query = useQuery(getOneTaskQueryOptions(id));

  return {
    ...query,
    task: query.data,
  };
};
