export interface IWorkSpace {
  name: string;
  todos: [];
}

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
  email: string;
  firstName: string;
  lastName: string;
  workSpaces: IWorkSpace[];
  accessToken: string;
}
