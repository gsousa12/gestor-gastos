import { useState } from "react";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { getExpenseListQuery } from "@common/api/queries/expenses/getExpenseListQuery";
import { deleteExpenseByIdMutation } from "@common/api/mutations/expense/deleteExpenseByIdMutation";
import { showToast } from "@components/toast/Toast";

export const getCreateExpenseFormDataEmpty = {
  supplierList: [],
  secretaryList: [],
  subSectorList: [],
};

export type ExpenseFilterValues = {
  supplierName: string;
  month: number | "";
  year: string;
};

export const useExpensesController = () => {
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
      await deleteExpenseByIdMutate({ id: selectedIdToDelete });
      setOpenDeletePopup(false);
      setSelectedIdToDelete(null);
      refetchExpenseList();
      showToast({
        title: "Despesa Deletada!",
        description: `Despesa deletada com sucesso.`,
        type: "success",
      });
    }
  };

  const handleOpenCreateExpense = () => {
    setOpenCreateExpensePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const {
    data: expenseListData,
    isPending,
    isFetching,
    refetch: refetchExpenseList,
  } = getExpenseListQuery({
    page: page,
    supplierName: filters.supplierName,
    month: filters.month === "" ? undefined : filters.month,
    year: filters.year === "" ? getCurrentYear() : filters.year,
  });

  const { mutateAsync: deleteExpenseByIdMutate } = deleteExpenseByIdMutation();

  return {
    expenseListData: expenseListData?.data ?? [],
    pagination: expenseListData?.pagination,
    isPending: isFetching || isPending,
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
