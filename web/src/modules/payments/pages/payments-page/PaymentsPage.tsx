import { GenerateReportButton } from "../../../../common/components/generate-report-button/GenerateReportButton";
import { ContentWrapper } from "../../../../common/components/wrappers/content-wrapper/ContentWrapper";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../../../common/utils/functions";
import { CreateButton } from "../../../expenses/components/create-button/CreateButton";
import { PaymentsTable } from "../../components/payments-table/PaymentsTable";

export const PaymentsPage = () => {
  return (
    <ContentWrapper>
      <div className="flex flex-row justify-end gap-1 items-center mb-4">
        <div>Filtro</div>
        <GenerateReportButton
          type="payment"
          month={getCurrentMonth()}
          year={getCurrentYear()}
        />
        <CreateButton label="Cadastrar Pagamento" openPopup={() => {}} />
      </div>

      <PaymentsTable />
    </ContentWrapper>
  );
};
