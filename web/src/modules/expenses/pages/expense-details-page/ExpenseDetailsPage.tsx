import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { useExpenseDetailsPageController } from "./expense-details-page-controller";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/common/components/toast/Toast";
import { ExpenseSummaryCards } from "../../components/expense-summary-cards/ExpenseSummaryCards";
import { ExpenseItemsTable } from "../../components/expense-items-table/ExpenseItemsTable";
import { useMobileDetect } from "@/common/hooks/useMobileDetect";

export const ExpenseDetailsPage = () => {
  const { expenseDetailsData, isPending, isError } =
    useExpenseDetailsPageController();
  const navigate = useNavigate();
  const isMobile = useMobileDetect();

  useEffect(() => {
    if (isError && !isPending) {
      showToast({
        type: "error",
        title: "Erro ao carregar detalhes da despesa",
        description:
          "Não foi possível carregar os detalhes da despesa. Por favor, tente novamente mais tarde.",
      });
      navigate("/dashboard", { replace: true });
    }
  }, [isError, isPending, navigate]);

  if (isPending || !expenseDetailsData) {
    return (
      <ContentWrapper>
        <></>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      {/* Título */}
      <div className="flex justify-between items-center mb-4">
        <ContentTitle label="Detalhes da despesa" />
      </div>

      {/* Resumo em Cards */}
      <ExpenseSummaryCards data={expenseDetailsData} />

      {/* Tabela de itens */}
      <h3 className="mt-8 mb-2 text-lg font-semibold text-sky-700">
        {`Itens da despesa (${expenseDetailsData.expenseItems.length})`}
      </h3>
      <ExpenseItemsTable items={expenseDetailsData.expenseItems} />

      {/* Espaço extra para mobile não colar no bottom */}
      {isMobile && <div className="h-10" />}
    </ContentWrapper>
  );
};
