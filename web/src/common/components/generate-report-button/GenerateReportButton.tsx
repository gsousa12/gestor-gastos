import { FileChartColumn } from "lucide-react";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import {
  ConfirmReportGenerationPopup,
  reportTypes,
} from "../popups/confirm-report-generation-popup/ConfirmReportGenerationPopup";
import { useState } from "react";

export interface GenerateReportButtonProps {
  disabled: boolean;
  type: reportTypes;
  month: number;
  year: string;
}

export const GenerateReportButton = ({
  disabled,
  type,
  month,
  year,
}: GenerateReportButtonProps) => {
  const isMobile = useMobileDetect();
  const [
    openConfirmReportGenerationPopup,
    setOpenConfirmReportGenerationPopup,
  ] = useState<boolean>(false);

  const request = {
    reportType: type,
    month: month,
    year: year,
  };

  return (
    <div>
      <button
        className={
          isMobile
            ? `flex items-center justify-center p-2 bg-white text-gray-700 rounded-md transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-sky-400 disabled:opacity-60 ${
                disabled
                  ? "cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-sky-50 hover:text-sky-700"
              }`
            : `flex flex-row items-center gap-1 px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-sky-400 disabled:opacity-60 ${
                disabled
                  ? "cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-sky-50 hover:text-sky-700"
              }`
        }
        onClick={() => setOpenConfirmReportGenerationPopup(true)}
        disabled={disabled}
        title={
          disabled
            ? "Você não tem permissão para gerar relatórios."
            : "Gerar relatório"
        }
      >
        <FileChartColumn className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
        {!isMobile && <span>Gerar Relatório</span>}
      </button>
      <ConfirmReportGenerationPopup
        open={openConfirmReportGenerationPopup}
        onOpenChange={() => setOpenConfirmReportGenerationPopup(false)}
        generateReport={request}
      />
    </div>
  );
};
