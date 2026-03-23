import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

export const errorHandler = (
    error: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errorCode: error.errorCode,
            details: error.details ?? null,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
        errorCode: "INTERNAL_SERVER_ERROR",
        details: null,
        timestamp: new Date().toISOString(),
    });
};