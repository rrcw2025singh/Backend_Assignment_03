import { Router } from "express";
import {
    createLoan,
    deleteLoan,
    getAllLoans,
    getLoanById,
    updateLoan,
} from "../controllers/loanControllers";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router: Router = Router();

router.get("/", authenticate, getAllLoans);
router.get("/:id", authenticate, getLoanById);
router.post("/", authenticate, createLoan);
router.put("/:id", authenticate, authorize({ allowedRoles: ["admin"] }), updateLoan);
router.delete("/:id", authenticate, authorize({ allowedRoles: ["admin"] }), deleteLoan);

export default router;