import { useMutation } from '@tanstack/react-query';
import { httpClient, authApiService, type AuthResponse } from 'api';

export const useGoogleAuthMutation = () => {
  return useMutation({
    mutationFn: async (credential: string) => {
      const requestConfig = authApiService.googleAuth({ credential });
      return await httpClient<AuthResponse>(requestConfig);
    },
  });
};
