import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticate";
import { getUserDetails } from "../services/userServices";

export const getMyDetails = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.uid) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const user = await getUserDetails(req.user.uid);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user details",
    });
  }
};