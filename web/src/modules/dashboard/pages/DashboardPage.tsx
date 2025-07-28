// src/features/dashboard/pages/DashboardPage.tsx

import { ArrowRightCircle, Receipt, Truck } from "lucide-react";
import { ContentTitle } from "@common/components/content-title/ContentTitle";
import { InformationCard } from "@common/components/information-card/InformationCard";
import { ContentWrapper } from "@common/components/wrappers/content-wrapper/ContentWrapper";
import { LastExpenseTable } from "../components/last-expenses-table/LastExpenseTable";
import { getMonthName } from "@common/utils/functions";
import { SupplierDebitsPieChart } from "../components/supplier-debits-pie-chart/SupplierDebitsPieChart";
import { dashboardPageController } from "./dashboard-page-controller";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { DashboardFilters } from "../components/dashboard-filters/DashboardFilters";

export const DashboardPage = () => {
  const {
    dashboardData,
    filters, // Estado inicial para o popover
    activeApiFilters, // Filtros realmente aplicados, para exibir na tela
    applyFilters,
    clearFilters,
    refetchDashboardData,
    navigate,
  } = dashboardPageController();

  // O título do card agora usa o mês e ano do filtro que está ativo na API
  const monthYearLabel = `${getMonthName(activeApiFilters.month)}/${
    activeApiFilters.year
  }`;

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Dashboard" />
        <div className="flex items-center gap-2">
          {/* O componente de filtro recebe os valores iniciais e as funções */}
          <DashboardFilters
            initialValues={filters}
            onApply={applyFilters}
            onClear={clearFilters}
          />
          <RefreshButton onClick={refetchDashboardData} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:g:grid-cols-3 gap-2 mt-4">
        <InformationCard
          icon={<Truck className="w-9 h-9" />}
          description="Fornecedores cadastrados"
          value={dashboardData.activeSuppliers}
          valueType="quantity"
          onRedirect={() => navigate("/suppliers")}
        />
        <InformationCard
          icon={<Receipt className="w-9 h-9" />}
          description={`Somatório: Despesas (${monthYearLabel})`}
          value={dashboardData.expensesMonthSomatory}
          valueType="money"
          onRedirect={() => navigate("/expenses")}
        />
        <InformationCard
          icon={<ArrowRightCircle className="w-9 h-9" />}
          description={`Somatório: Pagamentos (${monthYearLabel})`}
          value={dashboardData.paymentsMonthSomatory}
          valueType="money"
          onRedirect={() => navigate("/payments")}
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
