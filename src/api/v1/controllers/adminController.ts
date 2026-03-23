import { Request, Response, NextFunction } from "express";
import { setUserRole } from "../services/userServiceTemp";
import { ValidationError } from "../errors/errors";

export const assignRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return next(new ValidationError("uid and role are required"));
    }

    if (role !== "admin" && role !== "user") {
      return next(new ValidationError("role must be either admin or user"));
    }

    const updatedUser = await setUserRole(uid, role);

    if (!updatedUser) {
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
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};