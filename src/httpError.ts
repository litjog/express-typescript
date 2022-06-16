export interface Error {
  message: string;
  status: number;
  success: boolean;
}

export default class HttpError extends Error {
  public success: boolean;

  constructor(public message: string, public status: number) {
    super(message);
    this.success = false;
    this.status = status;
    this.name = this.constructor.name;
  }
}
