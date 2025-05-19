import { GenerateReportButton } from "@common/components/generate-report-button/GenerateReportButton";
import { ContentWrapper } from "@common/components/wrappers/content-wrapper/ContentWrapper";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { CreateButton } from "@common/components/create-button/CreateButton";
import { PaymentsTable } from "../../components/payments-table/PaymentsTable";
import { usePaymentsPageController } from "./payments-page-controller";
import { ContentTitle } from "@common/components/content-title/ContentTitle";
import { PaymentsFilterPopup } from "../../components/payments-filter-popup/PaymentsFilterPopup";
import { Pagination } from "@common/components/pagination/Pagination";

export const PaymentsPage = () => {
  const { paymentListData, filters, applyFilters, clearFilters } =
    usePaymentsPageController();

  console.log(paymentListData);

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
          <CreateButton label="Registrar Pagamento" openPopup={() => {}} />
        </div>
      </div>

      <PaymentsTable />
      <Pagination
        currentPage={1}
        totalPages={1}
        totalItems={0}
        onPageChange={() => {}}
      />
    </ContentWrapper>
  );
};
