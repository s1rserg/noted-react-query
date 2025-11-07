import { queryOptions } from '@tanstack/react-query';
import { httpClient } from '../../httpClient';
import { QueryKeys } from '../../reactQuery';
import { type UserAvatarMedia, userApiService } from '../../services';

export const getAllAvatarsQueryOptions = () =>
  queryOptions<UserAvatarMedia[]>({
    queryKey: QueryKeys.avatars,
    queryFn: async ({ signal }) => {
      const response = await httpClient<UserAvatarMedia[]>(userApiService.getAllAvatars(signal));
      return response.data;
    },
  });
