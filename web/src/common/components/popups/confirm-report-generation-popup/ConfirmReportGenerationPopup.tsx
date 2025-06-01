import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../ui/dialog";
import { useEffect } from "react";
import {
  getErrorMessageFromAxiosBlob,
  getMonthName,
} from "@/common/utils/functions";
import { showToast } from "../../toast/Toast";
import { useCreateReport } from "@/common/api/mutations/report/createReportMutation";

export type reportTypes = "expense" | "payment";

export type GenerateReportType = {
  reportType: reportTypes;
  month: number;
  year: string;
};

interface ConfirmReportGenerationPopupProps {
  generateReport: GenerateReportType;
  open: boolean;
  onOpenChange: () => void;
}

export const ConfirmReportGenerationPopup = ({
  generateReport,
  open,
  onOpenChange,
}: ConfirmReportGenerationPopupProps) => {
  const { mutate: CreateReportMutation, isPending, error } = useCreateReport();

  const getReportTypeIdentification = (reportType: reportTypes) => {
    switch (reportType) {
      case "expense":
        return "Relatório de Despesas";
      case "payment":
        return "Relatório de Pagamentos";
      default:
        return "Desconhecido";
    }
  };

  const handleConfirm = () => {
    CreateReportMutation(generateReport);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Confirmar Geração de Relatório</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        {/* Conteúdo do popup */}
        <div className="mt-4 space-y-2">
          <div>
            <span className="font-semibold">Tipo:</span>{" "}
            {getReportTypeIdentification(generateReport.reportType)}
          </div>
          <div>
            <span className="font-semibold">Mês:</span>{" "}
            {getMonthName(generateReport.month)}
          </div>
          <div>
            <span className="font-semibold">Ano:</span> {generateReport.year}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 hover:cursor-pointer transition-colors"
            onClick={onOpenChange}
            disabled={isPending}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 hover:cursor-pointer transition-colors disabled:opacity-60"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? "Gerando..." : "Confirmar"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
