import { FileChartColumn } from "lucide-react";
import { useCreateReport } from "../../api/mutations/report/createReportMutation";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { useEffect } from "react";
import { showToast } from "../toast/Toast";
import {
  getErrorMessage,
  getErrorMessageFromAxiosBlob,
} from "@/common/utils/functions";

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

  // TODO: Criar uma controller e passar a logica do componente para lá
  const { mutate: CreateReportMutation, isPending, error } = useCreateReport();

  const handleGenerateReport = () => {
    CreateReportMutation(request);
  };

  useEffect(() => {
    if (error) {
      (async () => {
        const errorMessage = await getErrorMessageFromAxiosBlob(error);
        showToast({
          title: "Erro ao gerar relatório",
          description: errorMessage,
          type: "error",
        });
      })();
    }
  }, [error]);

  return (
    <button
      className={
        isMobile
          ? "flex items-center justify-center p-2 bg-white hover:cursor-pointer text-gray-700 rounded-md hover:bg-sky-50 hover:text-sky-700 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-sky-400 disabled:opacity-60"
          : "flex flex-row items-center gap-1 px-3 py-1 bg-white hover:cursor-pointer text-gray-700 text-sm font-medium rounded-md hover:bg-sky-50 hover:text-sky-700 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-sky-400 disabled:opacity-60"
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
