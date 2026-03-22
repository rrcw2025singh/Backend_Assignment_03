import { NextFunction, Request, Response } from "express";
import { auth } from "../../../config/firebaseConfig";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    admin?: boolean;
    role?: string;
    [key: string]: unknown;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Missing or invalid authorization token",
      });
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      admin: decodedToken.admin as boolean | undefined,
      role: decodedToken.role as string | undefined,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};