import { ContentWrapper } from "../../../../common/components/wrappers/content-wrapper/ContentWrapper";
import { GenerateReportButton } from "../../../../common/components/generate-report-button/GenerateReportButton";
import { CreateButton } from "../../components/create-button/CreateButton";
import { CreateExpensePopup } from "../../components/create-expense-popup/CreateExpensePopup";
import { ExpenseTable } from "../../components/expense-table/ExpenseTable";
import { Pagination } from "../../../../common/components/pagination/Pagination";
import { useExpensesController } from "./expensesPage.controller";
import { ExpenseFilterPopUp } from "../../components/expense-filter-popup/ExpenseFilterPopUp";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../../../common/utils/functions";
import { DeleteConfirmationPopup } from "../../../../common/components/popups/deletion-confirmation-popup/DeleteConfirmationPopup";
import { ContentTitle } from "../../../../common/components/content-title/ContentTitle";

export const ExpensesPage = () => {
  const {
    expensesData,
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
  } = useExpensesController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Despesas" />
        <div className="flex flex-row gap-1 items-center">
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
          <CreateButton
            label="Cadastrar Despesa"
            openPopup={handleOpenCreateExpense}
          />
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
        data={expensesData}
        onDeleteExpenseById={onDeleteExpenseById}
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
