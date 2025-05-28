import { GenerateReportButton } from "@common/components/generate-report-button/GenerateReportButton";
import { ContentWrapper } from "@common/components/wrappers/content-wrapper/ContentWrapper";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { PaymentsTable } from "../../components/payments-table/PaymentsTable";
import { usePaymentsPageController } from "./payments-page-controller";
import { ContentTitle } from "@common/components/content-title/ContentTitle";
import { PaymentsFilterPopup } from "../../components/payments-filter-popup/PaymentsFilterPopup";
import { Pagination } from "@common/components/pagination/Pagination";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { DeleteConfirmationPopup } from "@/common/components/popups/deletion-confirmation-popup/DeleteConfirmationPopup";

export const PaymentsPage = () => {
  const {
    paymentListData,
    filters,
    applyFilters,
    clearFilters,
    page,
    pagination,
    handlePageChange,
    handleCloseDeletePopup,
    isPending,
    refreshPaymentsList,
    onCancelPaymentById,
    openDeletePopup,
    handleCancelPayment,
  } = usePaymentsPageController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Pagamentos" />
        <div className="flex flex-row gap-1 items-center">
          <PaymentsFilterPopup
            filters={filters}
            onApply={applyFilters}
            onClear={clearFilters}
          />
          <GenerateReportButton
            type="payment"
            month={
              typeof filters.month === "number"
                ? filters.month
                : getCurrentMonth()
            }
            year={filters.year !== "" ? filters.year : getCurrentYear()}
          />
          <RefreshButton onClick={refreshPaymentsList} />
        </div>
      </div>

      <PaymentsTable
        data={paymentListData}
        isPendending={isPending}
        onCancelPaymentById={onCancelPaymentById}
      />

      <DeleteConfirmationPopup
        open={openDeletePopup}
        title="Cancelar Pagamento"
        description="Tem certeza que deseja cancelar esse pagamento? Essa ação não poderá ser desfeita."
        onCancel={handleCloseDeletePopup}
        onConfirm={handleCancelPayment}
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
