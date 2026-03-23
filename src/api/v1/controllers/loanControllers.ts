import { Request, Response, NextFunction } from "express";
import { NotFoundError, ValidationError } from "../errors/errors";

interface LoanApplication {
    id: number;
    applicant: string;
    amount: number;
    status: "pending" | "under_review" | "flagged" | "approved" | "rejected";
    createdAt: string;
}

let loans: LoanApplication[] = [
    {
        id: 1,
        applicant: "John Smith",
        amount: 50000,
        status: "pending",
        createdAt: "2025-01-10T10:00:00.000Z",
    },
    {
        id: 2,
        applicant: "Sarah Johnson",
        amount: 150000,
        status: "under_review",
        createdAt: "2025-01-08T10:00:00.000Z",
    },
];

export const getAllLoans = (
    _req: Request,
    res: Response
): void => {
    res.status(200).json({
        message: "Loan applications retrieved",
        count: loans.length,
        data: loans,
    });
};

export const getLoanById = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new ValidationError(
                "Loan id must be a valid number",
                "INVALID_LOAN_ID"
            );
        }

        const loan = loans.find((item) => item.id === id);

        if (!loan) {
            throw new NotFoundError(
                "Loan application not found",
                "LOAN_NOT_FOUND"
            );
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
        const { applicant, amount } = req.body ?? {};

        if (applicant === undefined || amount === undefined) {
            throw new ValidationError(
                "Applicant and amount are required",
                "REQUIRED_FIELDS_MISSING"
            );
        }

        if (typeof applicant !== "string" || applicant.trim() === "") {
            throw new ValidationError(
                "Applicant must be a non-empty string",
                "INVALID_APPLICANT"
            );
        }

        if (typeof amount !== "number" || amount <= 0) {
            throw new ValidationError(
                "Amount must be a number greater than 0",
                "INVALID_AMOUNT"
            );
        }

        const newLoan: LoanApplication = {
            id: loans.length > 0 ? loans[loans.length - 1].id + 1 : 1,
            applicant: applicant.trim(),
            amount,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        loans.push(newLoan);

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
        const id = Number(req.params.id);
        const { applicant, amount, status } = req.body ?? {};

        if (Number.isNaN(id)) {
            throw new ValidationError(
                "Loan id must be a valid number",
                "INVALID_LOAN_ID"
            );
        }

        const loan = loans.find((item) => item.id === id);

        if (!loan) {
            throw new NotFoundError(
                "Loan application not found",
                "LOAN_NOT_FOUND"
            );
        }

        if (
            applicant === undefined &&
            amount === undefined &&
            status === undefined
        ) {
            throw new ValidationError(
                "Request body is required",
                "REQUEST_BODY_REQUIRED"
            );
        }

        if (applicant !== undefined) {
            if (typeof applicant !== "string" || applicant.trim() === "") {
                throw new ValidationError(
                    "Applicant must be a non-empty string",
                    "INVALID_APPLICANT"
                );
            }
            loan.applicant = applicant.trim();
        }

        if (amount !== undefined) {
            if (typeof amount !== "number" || amount <= 0) {
                throw new ValidationError(
                    "Amount must be a number greater than 0",
                    "INVALID_AMOUNT"
                );
            }
            loan.amount = amount;
        }

        if (status !== undefined) {
            const validStatuses: LoanApplication["status"][] = [
                "pending",
                "under_review",
                "flagged",
                "approved",
                "rejected",
            ];

            if (!validStatuses.includes(status)) {
                throw new ValidationError(
                    "Status is invalid",
                    "INVALID_STATUS"
                );
            }

            loan.status = status;
        }

        res.status(200).json({
            message: "Loan application updated",
            data: loan,
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
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            throw new ValidationError(
                "Loan id must be a valid number",
                "INVALID_LOAN_ID"
            );
        }

        const loanIndex = loans.findIndex((item) => item.id === id);

        if (loanIndex === -1) {
            throw new NotFoundError(
                "Loan application not found",
                "LOAN_NOT_FOUND"
            );
        }

        loans.splice(loanIndex, 1);

        res.status(200).json({
            message: "Loan application deleted",
        });
    } catch (error) {
        next(error);
    }
};