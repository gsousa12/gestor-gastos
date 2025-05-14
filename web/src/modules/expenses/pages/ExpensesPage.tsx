import { useEffect, useState } from "react";
import { ContentTitle } from "../../../common/components/content-title/ContentTitle";
import { ContentWrapper } from "../../../common/components/wrappers/content-wrapper/ContentWrapper";
import { useGetExpenseList } from "../../../common/hooks/expense/useGetExpenseList";
import { GenerateReportButton } from "../../../common/components/generate-report-button/GenerateReportButton";
import { Paper } from "../../../common/components/paper/Paper";
import { CreateExpenseButton } from "../components/create-expense-button/CreateExpenseButton";
import { CreateExpensePopup } from "../components/create-expense-popup/CreateExpensePopup";

export const ExpensesPage = () => {
  // const request = {
  //   page: 1,
  //   supplierName: "",
  //   month: 5,
  //   year: "2025",
  // };
  // const { mutate, data, isPending } = useGetExpenseList();

  // useEffect(() => {
  //   mutate(request);
  // }, []);
  const [open, setOpen] = useState(false);
  return (
    <ContentWrapper>
      <ContentTitle label="Despesas" />
      <div className="flex flex-row justify-end gap-3 items-center">
        <GenerateReportButton type="payment" month={5} year="2025" />
        <CreateExpenseButton
          label="Criar Despesa"
          onClick={() => setOpen(true)}
        />
      </div>
      <CreateExpensePopup open={open} onOpenChange={setOpen} />
    </ContentWrapper>
  );
};
