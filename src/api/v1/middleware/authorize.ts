import { NextFunction, Response } from "express";
import { AuthorizationError, AuthenticationError } from "../errors/errors";
import { AuthenticatedRequest, AuthorizationOptions } from "../types/authTypes";

export const authorize = (options: AuthorizationOptions) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthenticationError("User is not authenticated"));
    }

    const userRole = req.user.role;

    if (!userRole) {
      return next(new AuthorizationError("User role is missing"));
    }

    if (!options.allowedRoles.includes(userRole)) {
      return next(new AuthorizationError("Forbidden: insufficient permissions"));
    }

    next();
  };
};