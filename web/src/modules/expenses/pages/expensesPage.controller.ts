import { useEffect, useState } from "react";
import { useGetExpenseList } from "../../../common/hooks/expense/useGetExpenseList";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../../common/utils/functions";

export type ExpenseFilterValues = {
  supplierName: string;
  month: number | "";
  year: string;
};
export const useExpensesController = () => {
  const { mutate, data, isPending } = useGetExpenseList();

  const [filters, setFilters] = useState<ExpenseFilterValues>({
    supplierName: "",
    month: getCurrentMonth(),
    year: getCurrentYear(),
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    mutate({
      page,
      supplierName: filters.supplierName,
      month: filters.month === "" ? undefined : filters.month,
      year: filters.year === "" ? getCurrentYear() : filters.year,
    });
  }, [filters, page]);

  const applyFilters = (newFilters: ExpenseFilterValues) => {
    setFilters(newFilters);
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      supplierName: "",
      month: getCurrentMonth(),
      year: getCurrentYear(),
    });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    expenses: data?.data ?? [],
    pagination: data?.pagination,
    isPending,
    filters,
    applyFilters,
    clearFilters,
    page,
    handlePageChange,
  };
};
