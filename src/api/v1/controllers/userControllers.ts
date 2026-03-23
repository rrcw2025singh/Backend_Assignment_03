import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/authTypes";
import { getUserDetails } from "../services/userServiceTemp";
import { AuthenticationError } from "../errors/errors";

export const getMyDetails = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.uid) {
      return next(new AuthenticationError("User not authenticated"));
    }

    const user = await getUserDetails(req.user.uid);

    if (!user) {
      res.status(404).json({
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};