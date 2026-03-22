import { NextFunction, Request, Response } from "express";
import { logger } from "../middleware/logger";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const statusCode = error.statusCode || 500;

    logger.error(`${req.method} ${req.originalUrl} -> ${statusCode} - ${error.message}`);

    if (error.stack) {
        logger.error(error.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
};