import { BaseResponse } from "./response.base";

export class ErrorResponse extends BaseResponse {
  hasError: boolean;
  errorCode: string;
  errorMessage?: string;

  constructor(errorCode: string, errorMessage: string = "") {
    super(false);
    this.hasError = true;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
