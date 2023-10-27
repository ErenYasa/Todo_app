export interface ISuccessResponse<T> {
  error: false;
  data: { result: T };
  error_code: null;
  error_message: null;
}

export interface IErrorData {
  error: string;
  data: null;
  error_code: string;
  error_message: string;
}

export interface IErrorResponse {
  data: IErrorData;
  status: number;
}
