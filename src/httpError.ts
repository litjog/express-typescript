interface Issue {
  prop: (string | number)[] | string | number;
  message: string;
}

export interface Error {
  message: string;
  success: boolean;
  status: number;
  issues: Issue[] | undefined;
}

export default class HttpError extends Error {
  public success: boolean;

  constructor(
    public message: string,
    public status: number,
    public issues?: Record<string, any>[]
  ) {
    super(message);
    this.success = false;
    this.status = status;
    this.issues = issues;
    this.name = this.constructor.name;
  }
}
