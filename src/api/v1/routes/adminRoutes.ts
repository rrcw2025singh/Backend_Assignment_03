import { Router } from "express";
import { assignRole } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.post("/set-role", authenticate, authorize({ allowedRoles: ["admin"] }), assignRole);

export default router;