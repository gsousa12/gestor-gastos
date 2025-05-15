import { FileChartColumn } from "lucide-react";
import { useCreateReport } from "../../api/mutations/report/useCreateReport";
import { useMobileDetect } from "../../hooks/useMobileDetect";

export interface GenerateReportButtonProps {
  type: string;
  month: number;
  year: string;
}

export const GenerateReportButton = ({
  type,
  month,
  year,
}: GenerateReportButtonProps) => {
  const isMobile = useMobileDetect();
  const request = {
    reportType: type,
    month: month,
    year: year,
  };
  const { mutate, isPending } = useCreateReport();

  const handleGenerateReport = () => {
    mutate(request);
  };

  return (
    <button
      className={
        isMobile
          ? "flex items-center justify-center p-2 bg-white hover:cursor-pointer text-gray-700 rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-60"
          : "flex flex-row items-center gap-1 px-3 py-1 bg-white hover:cursor-pointer text-gray-700 text-sm font-medium rounded-md hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-60"
      }
      onClick={handleGenerateReport}
      disabled={isPending}
      title="Gerar Relatório"
    >
      <FileChartColumn className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
      {!isMobile && <span>{isPending ? "Gerando..." : "Gerar Relatório"}</span>}
    </button>
  );
};
