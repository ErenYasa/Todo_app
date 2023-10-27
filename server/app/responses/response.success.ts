import { BaseResponse } from "./response.base";

export class SuccessResponse extends BaseResponse {
  data: any;
  hasError: boolean;

  constructor(data: any) {
    super(true);
    this.hasError = false;
    this.data = data;
  }
}
