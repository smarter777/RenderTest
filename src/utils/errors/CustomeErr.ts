export class CustomeError extends Error {
  statusCode: number;
  details: string | undefined;
  constructor(message: string, statusCode: number, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    // Set prototype explicit
    Object.setPrototypeOf(this, CustomeError.prototype);
  }
}
