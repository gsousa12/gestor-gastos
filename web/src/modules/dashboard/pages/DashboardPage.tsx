import { ArrowRightCircle, Receipt, Truck } from "lucide-react";
import { ContentTitle } from "../../../common/components/content-title/ContentTitle";
import { InformationCard } from "../../../common/components/information-card/InformationCard";
import { ContentWrapper } from "../../../common/components/wrappers/content-wrapper/ContentWrapper";
import { LastExpenseTable } from "../components/last-expenses-table/LastExpenseTable";

const mockData = {
  suppliers: 10,
  expenses: 10,
  payments: 10,
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
  ],
  lastPayments: [{}],
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
          onRedirect={() => {}}
        />
        <InformationCard
          icon={<Receipt className="w-9 h-9" />}
          description="Despesas aguardando pagamento"
          value={mockData.expenses}
          onRedirect={() => {}}
        />
        <InformationCard
          icon={<ArrowRightCircle className="w-9 h-9" />}
          description="Pagamentos realizados"
          value={mockData.payments}
          onRedirect={() => {}}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <div className="h-full">A</div>
          <div className="h-full">B</div>
        </div>
        <div className="h-full">
          <LastExpenseTable expenses={mockData.lastExpenses} />
        </div>
      </div>
    </ContentWrapper>
  );
};
