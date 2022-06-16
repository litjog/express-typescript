export interface Error {
  message: string;
  status: number;
  code: number;
  success: boolean;
}

export default class HttpError extends Error {
  public success: boolean;

  constructor(public message: string, public code: number) {
    super(message);
    this.success = false;
    this.code = code;
    this.name = this.constructor.name;
  }
}
