import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  Calendar,
  CheckCircle,
  CircleCheck,
  Clock,
  DollarSign,
  Info,
  Layers,
  Pencil,
  Trash2,
  Truck,
  User,
} from "lucide-react";

import {
  convertCentsToReal,
  formatExpenseStatus,
  getMonthName,
} from "@common/utils/functions";

import { ExpenseStatus } from "@common/utils/enums";
import { NotFoundItems } from "@components/not-found-items/NotFoundItems";
import { Expense } from "@common/api/interfaces/expense/expense-api-interfaces";
import { StatusBadge } from "@/common/components/badges/status-badge/StatusBadge";
import { ExpenseTableSkeleton } from "@/common/components/skeletons/expense-table-skeleton/ExpenseTableSkeleton";
import { NotFoundBox } from "@/common/components/not-found-box/NotFoundBox";

interface ExpenseTableProps {
  data: Expense[];
  onDeleteExpenseById: (id: number) => void;
  isPending: boolean;
}

export const ExpenseTable = ({
  data,
  onDeleteExpenseById,
  isPending,
}: ExpenseTableProps) => {
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
                Descrição
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <Layers className="w-4 h-4 text-sky-400" />
                Sub-Setor
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-4 h-4 text-sky-400" />
                Competência
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-sky-400" />
                Valor
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-sky-400" />
                Status
              </span>
            </TableHead>
            <TableHead className="text-sky-700 font-bold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-400">
                <ExpenseTableSkeleton />
              </TableCell>
            </TableRow>
          ) : data.length === 0 && !isPending ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-300 py-8">
                <NotFoundBox
                  title="Despesa não encontrada"
                  description="Nenhuma despesa foi encontrada. Tente aplicar outro filtro."
                />
              </TableCell>
            </TableRow>
          ) : (
            data.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-sky-50 transition">
                {/* Fornecedor */}
                <TableCell className="text-gray-700 font-medium">
                  {expense.supplierName}
                </TableCell>
                {/* Descrição */}
                <TableCell className="text-gray-700 font-medium">
                  {expense.description ?? "-"}
                </TableCell>
                {/* Sub-Setor */}
                <TableCell className="text-gray-700 font-medium">
                  {expense.subsectorName}
                </TableCell>
                {/* Competência */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-700 font-medium">
                      {String(expense.month).padStart(2, "0")}/{expense.year}
                    </span>
                  </div>
                </TableCell>
                {/* Valor */}
                <TableCell>
                  <span className="text-sm font-bold text-red-700 bg-red-50 rounded px-2 py-1">
                    R$ {convertCentsToReal(expense.amount)}
                  </span>
                </TableCell>
                {/* Status */}
                <TableCell>
                  <StatusBadge
                    text={formatExpenseStatus(expense.status)}
                    variant={
                      expense.status === ExpenseStatus.PENDING
                        ? "negative"
                        : "positive"
                    }
                    icon={
                      expense.status === ExpenseStatus.PENDING ? (
                        <Clock className="w-3 h-3" />
                      ) : (
                        <CircleCheck className="w-3 h-3" />
                      )
                    }
                  />
                </TableCell>
                {/* Ações */}
                <TableCell className="flex items-center justify-center gap-2">
                  <button
                    className="px-2 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition text-xs font-semibold 
                    disabled:bg-gray-200 disabled:text-gray-400 hover:cursor-pointer"
                    title={
                      expense.status === ExpenseStatus.PAID
                        ? "Despesa já foi paga."
                        : "Registrar pagamento"
                    }
                    disabled={expense.status === ExpenseStatus.PAID}
                    onClick={() => {
                      alert("Pagar despesa");
                    }}
                  >
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Pagar
                  </button>
                  <button
                    className="p-1 rounded hover:bg-yellow-50 transition"
                    title={
                      expense.status === ExpenseStatus.PAID
                        ? "Despesas pagas não podem ser editadas."
                        : "Editar"
                    }
                    disabled={expense.status === ExpenseStatus.PAID}
                    onClick={() => {
                      alert("Editar despesa");
                    }}
                  >
                    <Pencil
                      className={`w-4 h-4 ${
                        expense.status === ExpenseStatus.PAID
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-800 hover:text-yellow-600 hover:cursor-pointer"
                      }`}
                    />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-50 transition"
                    title={
                      expense.status === ExpenseStatus.PAID
                        ? "Despesas pagas não podem ser excluidas."
                        : "Excluir"
                    }
                    disabled={expense.status === ExpenseStatus.PAID}
                    onClick={() => onDeleteExpenseById(expense.id)}
                  >
                    <Trash2
                      className={`w-4 h-4 ${
                        expense.status === ExpenseStatus.PAID
                          ? "text-gray-400 cursor-not-allowed"
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
