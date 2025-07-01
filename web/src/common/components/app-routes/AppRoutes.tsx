import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { DashboardPage } from "@/modules/dashboard/pages/DashboardPage";
import { ExpensesPage } from "@/modules/expenses/pages/expense-page/ExpensesPage";
import { LoginRoute } from "@/modules/auth/components/login-route/LoginRoute";
import { PaymentsPage } from "@/modules/payments/pages/payments-page/PaymentsPage";
import { NotFoundPage } from "../not-found-page/NotFoundPage";
import { SuppliersPage } from "@/modules/suppliers/pages/supplies-page/SuppliersPage";
import { SupplierDetailsPage } from "@/modules/suppliers/pages/supplier-details-page/SupplierDetailsPage";
import { SectorPage } from "@/modules/sector/pages/sector-page/SectorPage";
import { SecretaryPage } from "@/modules/secretary/pages/secretary-page/SecretaryPage";
import { ReportPage } from "@/modules/report/pages/report-page/ReportPage";

export const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/suppliers/details" element={<SupplierDetailsPage />} />
          <Route path="/sectors" element={<SectorPage />} />
          <Route path="/secretariats" element={<SecretaryPage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Route>
      </Routes>
    </main>
  );
};
