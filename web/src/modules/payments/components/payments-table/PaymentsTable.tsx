import { Payment } from "@/common/api/interfaces/payment/payment-api-interfaces";
import { StatusBadge } from "@/common/components/badges/status-badge/StatusBadge";
import { NotFoundItems } from "@/common/components/not-found-items/NotFoundItems";
import { PaymentTableSkeleton } from "@/common/components/skeletons/payment-table-skeleton/PaymentTableSkeleton";

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
  CheckCircle,
  CircleCheck,
  CircleX,
  DollarSign,
  Info,
  ReceiptText,
  Truck,
  User,
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
          <TableRow className="bg-sky-50">
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <Truck className="w-4 h-4 text-sky-400" />
                Fornecedor
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <Info className="w-4 h-4 text-sky-400" />
                Informações da Despesa
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-sky-400" />
                Valor pago
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-sky-400" />
                Status do Pagamento
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPendending ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400">
                <PaymentTableSkeleton />
              </TableCell>
            </TableRow>
          ) : data.length === 0 && !isPendending ? (
            <TableRow>
              <TableCell colSpan={5} className="text-gray-400 py-8">
                <NotFoundItems
                  title="Pagamento não encontrada"
                  description="Nenhum pagamento foi encontrado. Tente aplicar outro filtro."
                />
              </TableCell>
            </TableRow>
          ) : (
            data.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-sky-50 transition">
                {/* Fornecedor */}
                <TableCell className="font-medium text-gray-700">
                  {payment.supplierName}
                </TableCell>
                {/* Informações da Despesa */}
                <TableCell>
                  <div className="flex flex-row items-stretch gap-0">
                    {/* Descrição */}
                    <div
                      className="flex flex-col items-start justify-center min-w-[90px] max-w-[120px] pr-4"
                      style={{ flex: "0 0 120px" }}
                    >
                      <div className="flex gap-1 items-center w-full">
                        <Info className="w-3 h-3 text-gray-500 flex-shrink-0" />
                        <span
                          className="text-xs text-gray-700 font-medium truncate block w-full"
                          title={payment.expenseDesciption ?? ""}
                          style={{
                            maxWidth: "80px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {payment.expenseDesciption ?? "-"}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        Descrição
                      </span>
                    </div>
                    {/* Competência */}
                    <div className="flex flex-col items-center justify-center min-w-[70px] border-l border-slate-200 pl-4 pr-12">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
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
                    <div className="flex flex-col items-center justify-center min-w-[90px] border-l border-slate-200 pl-4">
                      <span className="text-[11px] font-medium text-red-700">
                        R$ {convertCentsToReal(payment.expenseAmount)}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">
                        Valor da despesa
                      </span>
                    </div>
                  </div>
                </TableCell>
                {/* Valor pago */}
                <TableCell>
                  <span className="text-sm font-bold text-emerald-700 bg-emerald-50 rounded px-2 py-1">
                    R$ {convertCentsToReal(payment.amount)}
                  </span>
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
