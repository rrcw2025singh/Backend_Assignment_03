import { Request, Response } from "express";
import { LoanApplication } from "../models/loanmodel";

const loans: LoanApplication[] = [
    {
        id: "1",
        applicant: "John Smith",
        amount: 50000,
        status: "pending",
        createdAt: "2025-01-10T10:00:00.000Z",
    },
    {
        id: "2",
        applicant: "Sarah Johnson",
        amount: 150000,
        status: "under_review",
        createdAt: "2025-01-08T10:00:00.000Z",
    },
];

export const healthCheck = (_req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
};

export const getAllLoans = (_req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: loans,
    });
};

export const getLoanById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const loan = loans.find((l) => l.id === id);

    if (!loan) {
        res.status(404).json({
            success: false,
            message: "Loan application not found",
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: loan,
    });
};

export const createLoan = (req: Request, res: Response): void => {
    const { applicant, amount, status } = req.body;

    const newLoan: LoanApplication = {
        id: String(loans.length + 1),
        applicant,
        amount,
        status,
        createdAt: new Date().toISOString(),
    };

    loans.push(newLoan);

    res.status(201).json({
        success: true,
        data: newLoan,
    });
};

export const updateLoan = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { applicant, amount, status } = req.body;

    const loan = loans.find((l) => l.id === id);

    if (!loan) {
        res.status(404).json({
            success: false,
            message: "Loan application not found",
        });
        return;
    }

    loan.applicant = applicant ?? loan.applicant;
    loan.amount = amount ?? loan.amount;
    loan.status = status ?? loan.status;

    res.status(200).json({
        success: true,
        data: loan,
    });
};

export const deleteLoan = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = loans.findIndex((l) => l.id === id);

    if (index === -1) {
        res.status(404).json({
            success: false,
            message: "Loan application not found",
        });
        return;
    }

    const deletedLoan = loans.splice(index, 1);

    res.status(200).json({
        success: true,
        data: deletedLoan[0],
    });
};