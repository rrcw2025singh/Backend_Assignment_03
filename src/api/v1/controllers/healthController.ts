import { Request, Response } from "express";

export const healthCheck = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
};