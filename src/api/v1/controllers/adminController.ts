import { Request, Response } from "express";
import { setUserRole } from "../services/userServices";

export const assignRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      res.status(400).json({
        success: false,
        message: "uid and role are required",
      });
      return;
    }

    if (role !== "admin" && role !== "user") {
      res.status(400).json({
        success: false,
        message: "role must be either 'admin' or 'user'",
      });
      return;
    }

    const result = await setUserRole(uid, role);

    res.status(200).json({
      success: true,
      message: `Role '${role}' assigned successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to assign role",
    });
  }
};