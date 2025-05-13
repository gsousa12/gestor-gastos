import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { DashboardPage } from "../../../modules/dashboard/pages/DashboardPage";
import { ExpensesPage } from "../../../modules/expenses/pages/ExpensesPage";
import { LoginRoute } from "../../../modules/auth/components/login-route/LoginRoute";

export const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/login" element={<LoginRoute />} />
        </Route>
      </Routes>
    </main>
  );
};
