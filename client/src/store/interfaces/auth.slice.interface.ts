import { IUser } from '@/types/global';

export interface IAuthState {
  [x: string]: any;
  isLoggedIn: boolean;
  user: IUser | null;
  access_token: string;
  refresh_token: string;
}
