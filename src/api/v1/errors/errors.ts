export class AppError extends Error {
    public statusCode: number;
    public errorCode: string;
    public details?: unknown;

    constructor(
        message: string,
        statusCode: number,
        errorCode: string,
        details?: unknown
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(
        message = "Validation failed",
        errorCode = "VALIDATION_ERROR",
        details?: unknown
    ) {
        super(message, 400, errorCode, details);
    }
}

export class AuthenticationError extends AppError {
    constructor(
        message = "Authentication failed",
        errorCode = "AUTHENTICATION_ERROR",
        details?: unknown
    ) {
        super(message, 401, errorCode, details);
    }
}

export class AuthorizationError extends AppError {
    constructor(
        message = "Access denied",
        errorCode = "AUTHORIZATION_ERROR",
        details?: unknown
    ) {
        super(message, 403, errorCode, details);
    }
}

export class NotFoundError extends AppError {
    constructor(
        message = "Resource not found",
        errorCode = "NOT_FOUND",
        details?: unknown
    ) {
        super(message, 404, errorCode, details);
    }
}