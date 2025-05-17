import { ArrowRightCircle, Receipt, Truck } from "lucide-react";
import { ContentTitle } from "../../../common/components/content-title/ContentTitle";
import { InformationCard } from "../../../common/components/information-card/InformationCard";
import { ContentWrapper } from "../../../common/components/wrappers/content-wrapper/ContentWrapper";
import { LastExpenseTable } from "../components/last-expenses-table/LastExpenseTable";
import { getCurrentMonth, getMonthName } from "../../../common/utils/functions";
import { SupplierDebitsPieChart } from "../components/supplier-debits-pie-chart/SupplierDebitsPieChart";

const mockData = {
  suppliers: 10,
  expensesMonthSomatory: 2500000,
  paymentsMonthSomatory: 1850000,
  lastExpenses: [
    {
      id: 1,
      supplierName: "Fornecedor A",
      description: "Material de escritório",
      amount: 120000,
      date: "2025-05-16T18:52:02.475Z",
    },
    {
      id: 2,
      supplierName: "Fornecedor B",
      description: "Serviços de manutenção",
      amount: 380000,
      date: "2025-05-16T18:52:02.475Z",
    },
    {
      id: 3,
      supplierName: "Fornecedor C",
      description: "Assinatura de software",
      amount: 89000,
      date: "2025-05-16T18:52:02.475Z",
    },
    {
      id: 4,
      supplierName: "Fornecedor A",
      description: "Material de escritório",
      amount: 120000,
      date: "2025-05-16T18:52:02.475Z",
    },
    {
      id: 5,
      supplierName: "Fornecedor B",
      description: "Serviços de manutenção",
      amount: 380000,
      date: "2025-05-16T18:52:02.475Z",
    },
    {
      id: 23,
      supplierName: "Fornecedor B",
      description: "Serviços de manutenção",
      amount: 380000,
      date: "2025-05-16T18:52:02.475Z",
    },
  ],
  supplierWithMostDebits: [
    {
      id: 34,
      name: "Fornecedor B",
      recurringDebit: 120000,
    },
    {
      id: 22,
      name: "Fornecedor B",
      recurringDebit: 270000,
    },
    {
      id: 33,
      name: "Fornecedor B",
      recurringDebit: 310000,
    },
    {
      id: 44,
      name: "Fornecedor B",
      recurringDebit: 230000,
    },
    {
      id: 55,
      name: "Fornecedor B",
      recurringDebit: 610000,
    },
  ],
};

export const DashboardPage = () => {
  return (
    <ContentWrapper>
      <ContentTitle label="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        <InformationCard
          icon={<Truck className="w-9 h-9" />}
          description="Fornecedores cadastrados"
          value={mockData.suppliers}
          valueType="quantity"
          onRedirect={() => {}}
        />
        <InformationCard
          icon={<Receipt className="w-9 h-9" />}
          description={`Somatório: Despesas (${getMonthName(
            getCurrentMonth()
          )})`}
          value={mockData.expensesMonthSomatory}
          valueType="money"
          onRedirect={() => {}}
        />
        <InformationCard
          icon={<ArrowRightCircle className="w-9 h-9" />}
          description={`Somatório: Pagamentos (${getMonthName(
            getCurrentMonth()
          )})`}
          value={mockData.paymentsMonthSomatory}
          valueType="money"
          onRedirect={() => {}}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
        <SupplierDebitsPieChart
          supplierDebitData={mockData.supplierWithMostDebits}
        />
        <LastExpenseTable expenses={mockData.lastExpenses} />
      </div>
    </ContentWrapper>
  );
};
