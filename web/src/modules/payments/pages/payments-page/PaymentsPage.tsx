import { GenerateReportButton } from "@common/components/generate-report-button/GenerateReportButton";
import { ContentWrapper } from "@common/components/wrappers/content-wrapper/ContentWrapper";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { PaymentsTable } from "../../components/payments-table/PaymentsTable";
import { usePaymentsPageController } from "./payments-page-controller";
import { ContentTitle } from "@common/components/content-title/ContentTitle";
import { PaymentsFilterPopup } from "../../components/payments-filter-popup/PaymentsFilterPopup";
import { Pagination } from "@common/components/pagination/Pagination";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { ConfirmationPopup } from "@/common/components/popups/confirmation-popup/ConfirmationPopup";
import { PaymentDetailsPopup } from "../../components/payment-details-popup/PaymentDetailsPopup";

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
    handleOpenPaymentDetails,
    selectedPaymentIdToDetail,
    handleClosePaymentDetailsPopup,
    openPaymentDetailsPopup,
    isAuthorizedUser,
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
            disabled={!isAuthorizedUser}
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
        handleOpenPaymentDetails={handleOpenPaymentDetails}
      />

      <ConfirmationPopup
        open={openDeletePopup}
        title="Cancelar Pagamento"
        description="Tem certeza que deseja cancelar esse pagamento? Essa ação não poderá ser desfeita."
        onCancel={handleCloseDeletePopup}
        onConfirm={handleCancelPayment}
      />

      <PaymentDetailsPopup
        paymentId={selectedPaymentIdToDetail}
        open={openPaymentDetailsPopup}
        onClosePopup={handleClosePaymentDetailsPopup}
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
