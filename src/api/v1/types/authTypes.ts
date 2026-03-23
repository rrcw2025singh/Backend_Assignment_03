import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    admin?: boolean;
    role?: string;
    [key: string]: unknown;
  };
}

export interface AuthorizationOptions {
  allowedRoles: string[];
}