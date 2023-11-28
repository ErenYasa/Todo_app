export interface IRegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}
