import { ContentWrapper } from "@components/wrappers/content-wrapper/ContentWrapper";
import { GenerateReportButton } from "@components/generate-report-button/GenerateReportButton";
import { CreateButton } from "@components/create-button/CreateButton";
import { CreateExpensePopup } from "../../components/create-expense-popup/CreateExpensePopup";
import { ExpenseTable } from "../../components/expense-table/ExpenseTable";
import { Pagination } from "@components/pagination/Pagination";
import { useExpensesController } from "./expensesPage.controller";
import { ExpenseFilterPopUp } from "../../components/expense-filter-popup/ExpenseFilterPopUp";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { DeleteConfirmationPopup } from "@components/popups/deletion-confirmation-popup/DeleteConfirmationPopup";
import { ContentTitle } from "@components/content-title/ContentTitle";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";

export const ExpensesPage = () => {
  const {
    expenseListData,
    pagination,
    isPending,
    filters,
    openCreateExpensePopup,
    openDeletePopup,
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
  } = useExpensesController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Despesas" />
        <div className="flex flex-row gap-1 items-center">
          <CreateButton
            label="Cadastrar Despesa"
            openPopup={handleOpenCreateExpense}
          />
          <ExpenseFilterPopUp
            filters={filters}
            onApply={applyFilters}
            onClear={clearFilters}
          />
          <GenerateReportButton
            type="expense"
            month={
              typeof filters.month === "number"
                ? filters.month
                : getCurrentMonth()
            }
            year={filters.year !== "" ? filters.year : getCurrentYear()}
          />
          <RefreshButton onClick={refetchExpenseList} />
        </div>
      </div>

      <CreateExpensePopup
        open={openCreateExpensePopup}
        onOpenChange={setOpenCreateExpensePopup}
      />
      <DeleteConfirmationPopup
        open={openDeletePopup}
        title="Excluir Despesa"
        description="Tem certeza que deseja excluir essa despesa? Essa ação não poderá ser desfeita."
        onCancel={handleCloseDeletePopup}
        onConfirm={handleConfirmDelete}
      />

      <ExpenseTable
        data={expenseListData}
        onDeleteExpenseById={onDeleteExpenseById}
        isPending={isPending}
      />

      <Pagination
        currentPage={page}
        totalPages={pagination?.totalPages ?? 1}
        totalItems={pagination?.totalItems ?? 0}
        onPageChange={handlePageChange}
      />
    </ContentWrapper>
  );
};
