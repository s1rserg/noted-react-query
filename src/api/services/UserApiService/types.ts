import type { Nullable } from 'types/utils';

export type UpdateUserDto = {
  name?: string;
  surname?: string;
  birthday?: string;
};

export interface UserAvatarMedia {
  id: number;
  createdAt: string;
  width: number;
  height: number;
  secureUrl: string;
}

export interface User {
  id: number;
  email: string;
  name: Nullable<string>;
  surname: Nullable<string>;
  birthday: Nullable<string>;
  createdAt: Date;
  updatedAt: Date;
  avatar: Nullable<UserAvatarMedia>;
}
