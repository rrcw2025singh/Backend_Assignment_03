import fs from "fs";
import path from "path";
import winston from "winston";

const logDirectory = path.join(process.cwd(), "logs");

// Create logs folder automatically if it does not exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
);

export const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new winston.transports.File({
            filename: path.join(logDirectory, "error.log"),
            level: "error"
        }),
        new winston.transports.File({
            filename: path.join(logDirectory, "combined.log")
        })
    ]
});

// Also log to console in development
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp, stack }) => {
                    return `${timestamp} [${level}]: ${stack || message}`;
                })
            )
        })
    );
}