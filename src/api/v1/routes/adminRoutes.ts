import { Router } from "express";
import { assignRole } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorizeAdmin } from "../middleware/authorize";

const router = Router();

router.post("/set-role", authenticate, authorizeAdmin, assignRole);

export default router;