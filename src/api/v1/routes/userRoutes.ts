import { Router } from "express";
import {
  createLoan,
  deleteLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
} from "../controllers/loanControllers";

const router: Router = Router();

router.get("/", getAllLoans);
router.get("/:id", getLoanById);
router.post("/", createLoan);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;