import { useState } from "react";
import { ContentWrapper } from "../../../../common/components/wrappers/content-wrapper/ContentWrapper";
import { GenerateReportButton } from "../../../../common/components/generate-report-button/GenerateReportButton";
import { CreateExpenseButton } from "../../components/create-expense-button/CreateExpenseButton";
import { CreateExpensePopup } from "../../components/create-expense-popup/CreateExpensePopup";
import { ExpenseTable } from "../../components/expense-table/ExpenseTable";
import { Pagination } from "../../../../common/components/pagination/Pagination";
import { useExpensesController } from "./expensesPage.controller";
import { ExpenseFilterPopUp } from "../../components/expense-filter-popup/ExpenseFilterPopUp";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../../../common/utils/functions";

export const ExpensesPage = () => {
  const {
    expenses,
    pagination,
    isPending,
    filters,
    applyFilters,
    clearFilters,
    page,
    handlePageChange,
  } = useExpensesController();

  const [openCreateExpensePopup, setOpenCreateExpensePopup] = useState(false);

  return (
    <ContentWrapper>
      {/* <ContentTitle label="Despesas" /> */}
      <div className="flex flex-row justify-end gap-1 items-center mb-4">
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
        <CreateExpenseButton
          label="Cadastrar Despesa"
          openPopup={() => setOpenCreateExpensePopup(true)}
        />
      </div>
      <CreateExpensePopup
        open={openCreateExpensePopup}
        onOpenChange={setOpenCreateExpensePopup}
      />
      <ExpenseTable data={expenses} />
      <Pagination
        currentPage={page}
        totalPages={pagination?.totalPages ?? 1}
        totalItems={pagination?.totalItems ?? 0}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </ContentWrapper>
  );
};
