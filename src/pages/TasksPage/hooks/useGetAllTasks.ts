import { useQuery } from '@tanstack/react-query';
import { getAllTasksQueryOptions } from 'api';
import { getQueryParameters } from '../helpers/getQueryParams';

export const useGetAllTasks = (searchParams: URLSearchParams) => {
  const query = useQuery(getAllTasksQueryOptions(getQueryParameters(searchParams)));

  return {
    ...query,
    tasks: query.data,
  };
};
