import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { Dashboard } from "../../../modules/dashboard/pages/Dashboard";
import { Expenses } from "../../../modules/expenses/pages/Expenses";

export const AppRoutes = () => {
  return (
    <main>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </main>
  );
};
