export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validation failed", code = "VALIDATION_ERROR") {
    super(message, 400, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", code = "RESOURCE_NOT_FOUND") {
    super(message, 404, code);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed", code = "AUTHENTICATION_ERROR") {
    super(message, 401, code);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Access denied", code = "AUTHORIZATION_ERROR") {
    super(message, 403, code);
  }
}