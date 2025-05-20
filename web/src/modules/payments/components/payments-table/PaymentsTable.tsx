import { Payment } from "@/common/api/interfaces/payment/payment-api-interfaces";
import { StatusBadge } from "@/common/components/badges/status-badge/StatusBadge";
import { NotFoundItems } from "@/common/components/not-found-items/NotFoundItems";
import { PaymentStatus } from "@/common/utils/enums";
import {
  convertCentsToReal,
  formatPaymentStatus,
} from "@/common/utils/functions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@common/components/ui/table";
import {
  Calendar,
  CircleCheck,
  CircleX,
  Info,
  ReceiptText,
} from "lucide-react";

interface PaymentsTableProps {
  data: Payment[];
  isPendending: boolean;
}

// TODO: ANALISAR O FATO DE QUANDO EXCLUI UMA DESPESA, TODOS OS PAGAMENTOS ATRELADOS A ELA SAO EXCLUIDOS

export const PaymentsTable = ({ data, isPendending }: PaymentsTableProps) => {
  return (
    <div className="rounded-lg border border-gray-100 overflow-x-auto shadow-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-400 font-semibold">
              Fornecedor
            </TableHead>
            <TableHead className="text-gray-400 font-semibold">
              Informações da Despesa
            </TableHead>
            <TableHead className="text-gray-400 font-semibold">
              Valor pago
            </TableHead>
            <TableHead className="text-gray-400 font-semibold">
              Status do Pagamento
            </TableHead>
            <TableHead className="text-gray-400 font-semibold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && !isPendending ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                <NotFoundItems
                  title="Pagamento não encontrada"
                  description="Nenhum pagamento foi encontrado. Tente aplicar outro filtro."
                />
              </TableCell>
            </TableRow>
          ) : (
            data.map((payment) => (
              <TableRow
                key={payment.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Fornecedor */}
                <TableCell className="font-medium text-gray-700">
                  {payment.supplierName}
                </TableCell>
                {/* Informações da Despesa */}
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-12 ">
                      {/* Descrição */}
                      <div className="flex flex-col items-start min-w-[70px]">
                        <div className="flex gap-1">
                          <Info className="w-3 h-3 text-gray-500" />
                          <span
                            className="text-xs text-gray-700 font-semibold truncate max-w-[80px]"
                            title={payment.expenseDesciption ?? ""}
                          >
                            {payment.expenseDesciption ?? "-"}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Descrição
                        </span>
                      </div>
                      {/* Competência */}
                      <div className="flex flex-col items-center min-w-[70px] border-l border-slate-200 pl-4">
                        <div className="flex items-start gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-[11px] font-medium text-gray-600">
                            {String(payment.month).padStart(2, "0")}/
                            {payment.year}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Competência
                        </span>
                      </div>
                      {/* Valor da despesa */}
                      <div className="flex flex-col items-center min-w-[70px] border-l border-slate-200 pl-4">
                        <span className="text-[11px] font-semibold text-red-700">
                          R$ {convertCentsToReal(payment.expenseAmount)}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Valor da despesa
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                {/* Valor pago */}
                <TableCell className="font-semibold text-emerald-600">
                  R$ {convertCentsToReal(payment.amount)}
                </TableCell>
                {/* Status do Pagamento */}
                <TableCell>
                  <StatusBadge
                    text={formatPaymentStatus(payment.status)}
                    variant={
                      payment.status === PaymentStatus.CANCELED
                        ? "negative"
                        : "positive"
                    }
                    icon={
                      payment.status === PaymentStatus.CANCELED ? (
                        <CircleX className="w-3 h-3 " />
                      ) : (
                        <CircleCheck className="w-3 h-3" />
                      )
                    }
                  />
                </TableCell>
                {/* Ações */}
                <TableCell className="flex items-center justify-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-sky-50 transition"
                    title="Detalhes do pagamento"
                    onClick={() => {
                      alert("Detalhes do pagamento");
                    }}
                  >
                    <ReceiptText
                      className={`w-4 h-4   ${
                        payment.status === PaymentStatus.CANCELED
                          ? "text-gray-400 cursor-not-allowed "
                          : "text-gray-800 hover:text-lime-600 hover:cursor-pointer"
                      }`}
                    />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-sky-50 transition"
                    title={
                      payment.status === PaymentStatus.CANCELED
                        ? "Pagamento já foi cancelado."
                        : "Cancelar pagamento"
                    }
                    disabled={payment.status === PaymentStatus.CANCELED}
                    onClick={() => {
                      alert("cancelar pagamento");
                    }}
                  >
                    <CircleX
                      className={`w-4 h-4   ${
                        payment.status === PaymentStatus.CANCELED
                          ? "text-gray-400 cursor-not-allowed "
                          : "text-gray-800 hover:text-red-600 hover:cursor-pointer"
                      }`}
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
