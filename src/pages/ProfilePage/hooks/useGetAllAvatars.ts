import { useQuery } from '@tanstack/react-query';
import { getAllAvatarsQueryOptions } from 'api';

export const useGetAllAvatars = () => {
  return useQuery(getAllAvatarsQueryOptions());
};
