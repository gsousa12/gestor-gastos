import { useEffect, useState } from "react";
import { useGetExpenseList } from "../../../../common/api/mutations/expense/useGetExpenseList";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../../../common/utils/functions";
import { useDeleteExpenseById } from "../../../../common/api/mutations/expense/useDeleteExpenseById";

export type ExpenseFilterValues = {
  supplierName: string;
  month: number | "";
  year: string;
};

export const useExpensesController = () => {
  const { mutate: getExpenseList, data, isPending } = useGetExpenseList();
  const { mutateAsync: deleteExpenseById } = useDeleteExpenseById();

  const [filters, setFilters] = useState<ExpenseFilterValues>({
    supplierName: "",
    month: getCurrentMonth(),
    year: getCurrentYear(),
  });

  const [page, setPage] = useState(1);
  const [openCreateExpensePopup, setOpenCreateExpensePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    getExpenseList({
      page,
      supplierName: filters.supplierName,
      month: filters.month === "" ? undefined : filters.month,
      year: filters.year === "" ? getCurrentYear() : filters.year,
    });
  }, [filters, page, getExpenseList]);

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

  const onDeleteExpenseById = (id: number) => {
    setSelectedIdToDelete(id);
    setOpenDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedIdToDelete !== null) {
      await deleteExpenseById(selectedIdToDelete);
      setOpenDeletePopup(false);
      setSelectedIdToDelete(null);
      getExpenseList({
        page,
        supplierName: filters.supplierName,
        month: filters.month === "" ? undefined : filters.month,
        year: filters.year === "" ? getCurrentYear() : filters.year,
      });
    }
  };

  const handleOpenCreateExpense = () => {
    setOpenCreateExpensePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  return {
    expensesData: data?.data ?? [],
    pagination: data?.pagination,
    isPending,
    filters,
    openCreateExpensePopup,
    openDeletePopup,
    selectedIdToDelete,
    page,
    applyFilters,
    clearFilters,
    handlePageChange,
    onDeleteExpenseById,
    handleConfirmDelete,
    handleOpenCreateExpense,
    handleCloseDeletePopup,
    setOpenCreateExpensePopup,
  };
};
