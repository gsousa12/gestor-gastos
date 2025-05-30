import { FileChartColumn } from "lucide-react";
import { useCreateReport } from "../../api/mutations/report/createReportMutation";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { useEffect } from "react";
import { showToast } from "../toast/Toast";
import { getErrorMessageFromAxiosBlob } from "@/common/utils/functions";

export interface GenerateReportButtonProps {
  disabled: boolean;
  type: string;
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
  const request = {
    reportType: type,
    month: month,
    year: year,
  };

  // TODO: Criar uma controller e passar a logica do componente para lá
  const { mutate: CreateReportMutation, isPending, error } = useCreateReport();

  const handleGenerateReport = () => {
    if (disabled) {
      showToast({
        title: "Sem autorização.",
        description: "Você não tem permissão para gerar relatórios.",
        type: "error",
      });
      return;
    }
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
      onClick={handleGenerateReport}
      disabled={isPending || disabled}
      title={
        disabled
          ? "Você não tem permissão para gerar relatórios."
          : "Gerar relatório"
      }
    >
      <FileChartColumn className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
      {!isMobile && <span>{isPending ? "Gerando..." : "Gerar Relatório"}</span>}
    </button>
  );
};
