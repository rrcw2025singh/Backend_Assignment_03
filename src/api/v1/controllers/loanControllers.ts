import { Request, Response, NextFunction } from "express";
import * as loanService from "../services/loanService";

export const getAllLoans = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const loans = loanService.getAllLoans();

    res.status(200).json({
      message: "Loan applications retrieved",
      data: loans,
    });
  } catch (error) {
    next(error);
  }
};

export const getLoanById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = Number(idParam);

    const loan = loanService.getLoanById(id);

    if (!loan) {
      res.status(404).json({
        error: {
          code: "LOAN_NOT_FOUND",
          message: "Loan not found",
        },
      });
      return;
    }

    res.status(200).json({
      message: "Loan application retrieved",
      data: loan,
    });
  } catch (error) {
    next(error);
  }
};

export const createLoan = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const newLoan = loanService.createLoan(req.body);

    res.status(201).json({
      message: "Loan application created",
      data: newLoan,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLoan = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({
        error: {
          code: "REQUEST_BODY_REQUIRED",
          message: "Request body is required",
        },
      });
      return;
    }

    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = Number(idParam);

    const updatedLoan = loanService.updateLoan(id, req.body);

    if (!updatedLoan) {
      res.status(404).json({
        error: {
          code: "LOAN_NOT_FOUND",
          message: "Loan not found",
        },
      });
      return;
    }

    res.status(200).json({
      message: "Loan application updated",
      data: updatedLoan,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLoan = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = Number(idParam);

    const deleted = loanService.deleteLoan(id);

    if (!deleted) {
      res.status(404).json({
        error: {
          code: "LOAN_NOT_FOUND",
          message: "Loan not found",
        },
      });
      return;
    }

    res.status(200).json({
      message: "Loan application deleted",
    });
  } catch (error) {
    next(error);
  }
};