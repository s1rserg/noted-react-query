import { queryOptions } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import { QueryKeys } from '../../reactQuery';
import { userApiService, type User } from '../../services';
import { localStorageService } from 'utils/LocalStorageService';

export const getUserQueryOptions = () =>
  queryOptions<User>({
    queryKey: QueryKeys.user,
    queryFn: async () => {
      const response = await httpClient<User>(userApiService.fetchUser());
      return response.data;
    },

    enabled: !!localStorageService.getAccessToken(),
  });
