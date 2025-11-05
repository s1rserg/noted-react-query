import type { User } from 'api';
import { authApiService, handleApiError, httpClient, userApiService } from 'api';

import type { Nullable } from 'types/utils';
import { create } from 'zustand';
import { localStorageService } from 'utils/LocalStorageService';
import { googleLogout } from '@react-oauth/google';

interface UserState {
  user: Nullable<User>;
  setUser: (user: User) => void;
  clearUser: () => void;
  initUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  initUser: async () => {
    try {
      const { data } = await httpClient<User>(userApiService.fetchUser());
      set({ user: data });
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async () => {
    try {
      await httpClient(authApiService.signOut());
    } catch (error) {
      handleApiError(error);
    } finally {
      googleLogout();
      localStorageService.deleteAccessToken();
      set({ user: null });
    }
  },
}));
