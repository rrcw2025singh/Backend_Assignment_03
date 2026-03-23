import { NextFunction, Response } from "express";
import { auth } from "../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";
import { AuthenticatedRequest } from "../types/authTypes";

export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AuthenticationError("Missing or invalid authorization token"));
    }

    const idToken = authHeader.split("Bearer ")[1];

    if (!idToken) {
      return next(new AuthenticationError("Authorization token is missing"));
    }

    const decodedToken = await auth.verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      admin: decodedToken.admin as boolean | undefined,
      role: decodedToken.role as string | undefined,
    };

    next();
  } catch (error: any) {
    if (error?.code === "auth/id-token-expired") {
      return next(new AuthenticationError("Token has expired"));
    }

    if (error?.code === "auth/argument-error") {
      return next(new AuthenticationError("Invalid authorization token"));
    }

    return next(new AuthenticationError("Unauthorized"));
  }
};