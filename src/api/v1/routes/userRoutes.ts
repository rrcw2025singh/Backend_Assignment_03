import { Router } from "express";
import { getMyDetails } from "../controllers/userControllers";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/me", authenticate, getMyDetails);

export default router;