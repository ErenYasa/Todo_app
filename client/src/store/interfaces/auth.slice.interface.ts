export interface IAuthState {
  [x: string]: any;
  isLoggedIn: boolean;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  access_token: null;
}
