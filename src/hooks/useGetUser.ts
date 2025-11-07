import { useQuery } from '@tanstack/react-query';
import { getUserQueryOptions } from 'api';

export const useGetUser = () => {
  return useQuery(getUserQueryOptions());
};
