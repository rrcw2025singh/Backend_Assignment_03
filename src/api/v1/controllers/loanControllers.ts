import { Request, Response } from "express";

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

export const getAllLoans = (_req: Request, res: Response): void => {
    res.status(200).json({
        message: "Loan applications retrieved",
        count: loans.length,
        data: loans,
    });
};

export const getLoanById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const loan = loans.find((item) => item.id === id);

    if (!loan) {
        res.status(404).json({
            success: false,
            error: {
                message: "Loan application not found",
                code: "LOAN_NOT_FOUND",
            },
            timestamp: new Date().toISOString(),
        });
        return;
    }

    res.status(200).json({
        message: "Loan application retrieved",
        data: loan,
    });
};

export const createLoan = (req: Request, res: Response): void => {
    const { applicant, amount } = req.body;

    const newLoan: LoanApplication = {
        id: loans.length > 0 ? loans[loans.length - 1].id + 1 : 1,
        applicant,
        amount,
        status: "pending",
        createdAt: new Date().toISOString(),
    };

    loans.push(newLoan);

    res.status(201).json({
        message: "Loan application created",
        data: newLoan,
    });
};

export const updateLoan = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const { applicant, amount, status } = req.body;

    const loan = loans.find((item) => item.id === id);

    if (!loan) {
        res.status(404).json({
            success: false,
            error: {
                message: "Loan application not found",
                code: "LOAN_NOT_FOUND",
            },
            timestamp: new Date().toISOString(),
        });
        return;
    }

    loan.applicant = applicant ?? loan.applicant;
    loan.amount = amount ?? loan.amount;
    loan.status = status ?? loan.status;

    res.status(200).json({
        message: "Loan application updated",
        data: loan,
    });
};

export const deleteLoan = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const loanIndex = loans.findIndex((item) => item.id === id);

    if (loanIndex === -1) {
        res.status(404).json({
            success: false,
            error: {
                message: "Loan application not found",
                code: "LOAN_NOT_FOUND",
            },
            timestamp: new Date().toISOString(),
        });
        return;
    }

    loans.splice(loanIndex, 1);

    res.status(200).json({
        message: "Loan application deleted",
    });
};