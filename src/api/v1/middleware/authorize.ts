import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authenticate";

export const authorizeAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.admin !== true) {
    res.status(403).json({
      success: false,
      message: "Forbidden: Admin access required",
    });
    return;
  }

  next();
};