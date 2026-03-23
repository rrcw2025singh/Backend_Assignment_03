import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/authTypes";
import { getUserDetails } from "../services/userServices";
import { AuthenticationError } from "../errors/errors";

export const getMyDetails = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.uid) {
      return next(new AuthenticationError("Unauthorized"));
    }

    const user = await getUserDetails(req.user.uid);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};