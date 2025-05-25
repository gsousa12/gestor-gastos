import { ArrowRightCircle, Receipt, Truck } from "lucide-react";
import { ContentTitle } from "@common/components/content-title/ContentTitle";
import { InformationCard } from "@common/components/information-card/InformationCard";
import { ContentWrapper } from "@common/components/wrappers/content-wrapper/ContentWrapper";
import { LastExpenseTable } from "../components/last-expenses-table/LastExpenseTable";
import { getCurrentMonth, getMonthName } from "@common/utils/functions";
import { SupplierDebitsPieChart } from "../components/supplier-debits-pie-chart/SupplierDebitsPieChart";
import { dashboardPageController } from "./dashboard-page-controller";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";

export const DashboardPage = () => {
  const { dashboardData, refetchDashboardData } = dashboardPageController();
  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Dashboard" />
        <RefreshButton onClick={refetchDashboardData} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        <InformationCard
          icon={<Truck className="w-9 h-9" />}
          description="Fornecedores cadastrados"
          value={dashboardData.activeSuppliers}
          valueType="quantity"
          onRedirect={() => {}}
        />
        <InformationCard
          icon={<Receipt className="w-9 h-9" />}
          description={`Somatório: Despesas (${getMonthName(
            getCurrentMonth()
          )})`}
          value={dashboardData.expensesMonthSomatory}
          valueType="money"
          onRedirect={() => {}}
        />
        <InformationCard
          icon={<ArrowRightCircle className="w-9 h-9" />}
          description={`Somatório: Pagamentos (${getMonthName(
            getCurrentMonth()
          )})`}
          value={dashboardData.paymentsMonthSomatory}
          valueType="money"
          onRedirect={() => {}}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
        <SupplierDebitsPieChart
          supplierDebitData={dashboardData.supplierWithMostDebits}
        />
        <LastExpenseTable expenses={dashboardData.lastExpenses} />
      </div>
    </ContentWrapper>
  );
};
