import { Expense } from "../expense/expense-api-interfaces";
import { Payment } from "../payment/payment-api-interfaces";

export interface GetSupplierListRequest {
  page: number;
  name?: string;
  has_debits?: string;
}

export interface GetSupplierByIdRequest {
  id: number;
}

export interface Supplier {
  id: number;
  name: string;
  companyName: string | null;
  recurringDebit: number;
  taxId: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface FinancialSummary {
  totalPaidThisMonth: number;
  totalPendingExpenses: number;
  paymentHistoryByMonth: Array<{
    month: number;
    year: string;
    totalPaid: number;
  }>;
}

// export interface RecentExpense {
//   id: number;
//   description: string | null;
//   month: number;
//   year: string;
//   amount: number;
//   status: string;
//   createdAt: string;
// }

// export interface PaymentHistoryItem {
//   id: number;
//   month: number;
//   year: string;
//   amount: number;
//   status: string;
//   createdAt: string;
// }

export interface SupplierDetailsResponse {
  supplierInformation: Supplier;
  financialSummary: FinancialSummary;
  recentExpenses: Expense[];
  paymentHistory: Payment[];
}

export interface CreateSupplierRequest {
  name: string;
  companyName: string | null;
  taxId: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
}
