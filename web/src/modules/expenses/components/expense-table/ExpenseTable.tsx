import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { CircleCheck, Clock, DollarSign, Pencil, Trash2 } from "lucide-react";

import {
  convertCentsToReal,
  formatExpenseStatus,
  getMonthName,
} from "@common/utils/functions";
import { StatusBadge } from "@components/badges/status-badge/StatusBadge";
import { ExpenseStatus } from "@common/utils/enums";
import { NotFoundItems } from "@components/not-found-items/NotFoundItems";
import { Expense } from "@common/api/interfaces/expense/expense-api-interfaces";

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
    <div className="rounded-lg border border-gray-100 overflow-x-auto shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-white">
            <TableHead className="text-gray-400 font-semibold">
              Fornecedor
            </TableHead>
            <TableHead className="text-gray-400 font-semibold">
              Descrição
            </TableHead>
            <TableHead className="text-gray-400 font-semibold">Valor</TableHead>

            <TableHead className="text-gray-400 font-semibold">
              Sub-Setor
            </TableHead>
            <TableHead className="text-gray-400 font-semibold">Mês</TableHead>
            <TableHead className="text-gray-400 font-semibold">Ano</TableHead>
            <TableHead className="text-gray-400 font-semibold">
              Status de Pagamento
            </TableHead>
            <TableHead className="text-gray-400 font-semibold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && !isPending ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-300 py-8">
                <NotFoundItems
                  title="Despesa não encontrada"
                  description="Nenhuma despesa foi encontrada. Tente aplicar outro filtro."
                />
              </TableCell>
            </TableRow>
          ) : (
            data.map((expense) => (
              <TableRow
                key={expense.id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="text-gray-700">
                  {expense.supplierName}
                </TableCell>
                <TableCell className="text-gray-700">
                  {expense.description}
                </TableCell>
                <TableCell className="text-gray-700">
                  {`R$ ${convertCentsToReal(expense.amount)}`}
                </TableCell>

                <TableCell className="text-gray-700">
                  {expense.subsectorName}
                </TableCell>
                <TableCell className="text-gray-700">
                  {getMonthName(expense.month)}
                </TableCell>
                <TableCell className="text-gray-700">{expense.year}</TableCell>
                <TableCell className="text-gray-700">
                  {
                    <StatusBadge
                      text={formatExpenseStatus(expense.status)}
                      variant={
                        expense.status === ExpenseStatus.PENDING
                          ? "negative"
                          : "positive"
                      }
                      icon={
                        expense.status === ExpenseStatus.PENDING ? (
                          <Clock className="w-3 h-3 " />
                        ) : (
                          <CircleCheck className="w-3 h-3" />
                        )
                      }
                    />
                  }
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-sky-50 transition"
                    title={
                      expense.status === ExpenseStatus.PAID
                        ? "Despesas já foi paga."
                        : "Registrar pagamento"
                    }
                    disabled={expense.status === ExpenseStatus.PAID}
                    onClick={() => {
                      alert("Pagar despesa");
                    }}
                  >
                    <DollarSign
                      className={`w-4 h-4   ${
                        expense.status === ExpenseStatus.PAID
                          ? "text-gray-400 cursor-not-allowed "
                          : "text-gray-800 hover:text-emerald-600 hover:cursor-pointer"
                      }`}
                    />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-sky-50 transition"
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
                      className={`w-4 h-4   ${
                        expense.status === ExpenseStatus.PAID
                          ? "text-gray-400 cursor-not-allowed "
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
                      className={`w-4 h-4   ${
                        expense.status === ExpenseStatus.PAID
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
