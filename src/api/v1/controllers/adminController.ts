import { Request, Response, NextFunction } from "express";
import { setUserRole } from "../services/userServices";
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
      return next(new ValidationError("role must be either 'admin' or 'user'"));
    }

    const result = await setUserRole(uid, role);

    res.status(200).json({
      success: true,
      message: `Role '${role}' assigned successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};