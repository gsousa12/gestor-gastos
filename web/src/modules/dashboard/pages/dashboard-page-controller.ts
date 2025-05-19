import { useState } from "react";
import { getCurrentMonth } from "@common/utils/functions";
import { getDashboardDataQuery } from "@common/api/queries/dashboard/getDashboardDataQuery";

export const getDashboardDataEmpty = {
  activeSuppliers: 0,
  expensesMonthSomatory: 0,
  paymentsMonthSomatory: 0,
  lastExpenses: [],
  supplierWithMostDebits: [],
};

export type DashboardFilterValues = {
  month: number | "";
};

export const dashboardPageController = () => {
  const [filters, setFilter] = useState<DashboardFilterValues>({
    month: getCurrentMonth(),
  });

  const { data, isPending } = getDashboardDataQuery({
    month: filters.month === "" ? getCurrentMonth() : filters.month,
  });

  const applyFilters = (newFilters: DashboardFilterValues) => {
    setFilter(newFilters);
  };

  return {
    dashboardData: data?.data ?? getDashboardDataEmpty,
    isPending,
    applyFilters,
  };
};
