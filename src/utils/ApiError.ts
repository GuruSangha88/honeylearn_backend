export class ApiError extends Error {
  statusCode: number;
  issues?: any[];

  constructor(message: string, statusCode = 500, issues?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.issues = issues;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
