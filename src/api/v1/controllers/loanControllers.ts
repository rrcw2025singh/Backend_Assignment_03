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
      success: true,
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
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
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
      success: true,
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
      success: true,
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

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
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
      success: true,
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
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
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
      success: true,
      message: "Loan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};