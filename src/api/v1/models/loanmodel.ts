export interface LoanApplication {
  id: string;
  applicant: string;
  amount: number;
  status: "pending" | "under_review" | "flagged" | "approved" | "rejected";
}