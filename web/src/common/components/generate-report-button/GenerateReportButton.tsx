import { FileChartColumn } from "lucide-react";
import { useCreateReport } from "../../hooks/report/useCreateReport";

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
      className="flex flex-row hover:cursor-pointer"
      onClick={handleGenerateReport}
      disabled={isPending}
    >
      <FileChartColumn className="h-5 w-5" />
      <span className="ml-2">
        {isPending ? "Gerando..." : "Gerar Relatório"}
      </span>
    </button>
  );
};
