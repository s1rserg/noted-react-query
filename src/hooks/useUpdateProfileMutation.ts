import { useMutation } from '@tanstack/react-query';
import { httpClient, userApiService, type UpdateUserDto } from 'api';

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const requestConfig = userApiService.updateProfile(data);
      await httpClient(requestConfig);
    },
  });
};
