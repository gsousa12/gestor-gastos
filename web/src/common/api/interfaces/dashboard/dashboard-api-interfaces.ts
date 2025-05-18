import { PaginationMeta } from "../api-response";

// Requests
export interface GetDashboardDataRequest {
  month: number;
}

// Responses
export interface GetDashboardDataResponse {
  message: string;
  pagination?: PaginationMeta;
  data: GetDashboardData;
}

// others
export interface GetDashboardData {
  activeSuppliers: number;
  expensesMonthSomatory: number;
  paymentsMonthSomatory: number;
  lastExpenses: LastExpenses[];
  supplierWithMostDebits: SupplierWithDebit[];
}

interface SupplierWithDebit {
  id: number;
  name: string;
  recurringDebit: number;
}

interface LastExpenses {
  id: number;
  supplierName: string;
  description: string | null;
  amount: number;
  date: string;
}
