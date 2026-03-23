import { LoanApplication } from "../models/loanModel";

let loans: LoanApplication[] = [
  {
    id: "1",
    applicant: "John Doe",
    amount: 5000,
    status: "pending",
  },
  {
    id: "2",
    applicant: "Jane Smith",
    amount: 8000,
    status: "approved",
  },
];

export const getAllLoans = (): LoanApplication[] => {
  return loans;
};

export const getLoanById = (id: string): LoanApplication | undefined => {
  return loans.find((loan) => loan.id === id);
};

export const createLoan = (
  loanData: Omit<LoanApplication, "id">
): LoanApplication => {
  const newLoan: LoanApplication = {
    id: String(loans.length > 0 ? Number(loans[loans.length - 1].id) + 1 : 1),
    ...loanData,
  };

  loans.push(newLoan);
  return newLoan;
};

export const updateLoan = (
  id: string,
  updatedData: Partial<Omit<LoanApplication, "id">>
): LoanApplication | undefined => {
  const loan = loans.find((item) => item.id === id);

  if (!loan) {
    return undefined;
  }

  Object.assign(loan, updatedData);
  return loan;
};

export const deleteLoan = (id: string): boolean => {
  const index = loans.findIndex((loan) => loan.id === id);

  if (index === -1) {
    return false;
  }

  loans.splice(index, 1);
  return true;
};