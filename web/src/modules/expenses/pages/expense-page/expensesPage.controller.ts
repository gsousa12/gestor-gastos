import { useState } from "react";
import {
  getCurrentMonth,
  getCurrentYear,
  getErrorMessage,
} from "@common/utils/functions";
import { getExpenseListQuery } from "@common/api/queries/expenses/getExpenseListQuery";
import { deleteExpenseByIdMutation } from "@common/api/mutations/expense/deleteExpenseByIdMutation";
import { showToast } from "@components/toast/Toast";
import { useAuthStore } from "@/common/store/auth/authStore";

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
  const isAuthorizedUserToGenerateReport = useAuthStore((state) =>
    state.hasPermission("generate_report")
  );
  const [filters, setFilters] = useState<ExpenseFilterValues>({
    supplierName: "",
    month: "",
    year: getCurrentYear(),
  });

  const [page, setPage] = useState(1);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(
    null
  );
  const [openCreateExpensePopup, setOpenCreateExpensePopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(
    null
  );
  const [openRegisterExpensePaymentPopup, setOpenRegisterExpensePaymentPopup] =
    useState(false);

  const applyFilters = (newFilters: ExpenseFilterValues) => {
    setFilters(newFilters);
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      supplierName: "",
      month: "",
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

  const onOpenPayExpensePopup = (id: number) => {
    setSelectedExpenseId(id);
    setOpenRegisterExpensePaymentPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedIdToDelete !== null) {
      try {
        await deleteExpenseByIdMutate({ id: selectedIdToDelete });
        setOpenDeletePopup(false);
        setSelectedIdToDelete(null);
        refetchExpenseList();
        showToast({
          title: "Despesa Deletada!",
          description: `Despesa deletada com sucesso.`,
          type: "success",
        });
      } catch (error) {
        setOpenDeletePopup(false);
        setSelectedIdToDelete(null);
        refetchExpenseList();
        showToast({
          title: "Erro ao deletar despesa!",
          description: getErrorMessage(error),
          type: "error",
        });
      }
    }
  };

  const handleOpenCreateExpense = () => {
    setOpenCreateExpensePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const handleCloseRegisterExpensePaymentPopup = () => [
    setOpenRegisterExpensePaymentPopup(false),
  ];

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
    refetchExpenseList,
    onOpenPayExpensePopup,
    openRegisterExpensePaymentPopup,
    handleCloseRegisterExpensePaymentPopup,
    selectedExpenseId,
    isAuthorizedUserToGenerateReport,
  };
};
