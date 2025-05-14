import { useEffect, useState } from "react";
import { useGetExpenseList } from "../../../common/hooks/expense/useGetExpenseList";

export type ExpenseFilterValues = {
  supplierName: string;
  month: number | "";
  year: string;
};
export const useExpensesController = () => {
  const { mutate, data, isPending } = useGetExpenseList();

  // Estado dos filtros
  const [filters, setFilters] = useState<ExpenseFilterValues>({
    supplierName: "",
    month: "",
    year: "",
  });

  // Estado da página
  const [page, setPage] = useState(1);

  // Dispara busca sempre que filtros ou página mudam
  useEffect(() => {
    mutate({
      page,
      supplierName: filters.supplierName,
      month: filters.month === "" ? undefined : filters.month,
      year: filters.year,
    });
  }, [filters, page]);

  // Funções para aplicar e limpar filtros
  const applyFilters = (newFilters: ExpenseFilterValues) => {
    setFilters(newFilters);
    setPage(1); // Sempre volta para a primeira página ao filtrar
  };

  const clearFilters = () => {
    setFilters({ supplierName: "", month: "", year: "" });
    setPage(1);
  };

  // Paginação
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
