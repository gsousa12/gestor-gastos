import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { DashboardPage } from "../../../modules/dashboard/pages/DashboardPage";
import { ExpensesPage } from "../../../modules/expenses/pages/expense-page/ExpensesPage";
import { LoginRoute } from "../../../modules/auth/components/login-route/LoginRoute";
import { PaymentsPage } from "../../../modules/payments/pages/payments-page/PaymentsPage";

export const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/payments" element={<PaymentsPage />} />
        </Route>
      </Routes>
    </main>
  );
};
