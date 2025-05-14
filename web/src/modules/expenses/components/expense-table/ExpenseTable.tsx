import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Expense } from "../../../../common/api/expense/expense";
import {
  convertCentsToReal,
  getMonthName,
} from "../../../../common/utils/functions";

interface ExpenseTableProps {
  data: Expense[];
}

export const ExpenseTable = ({ data }: ExpenseTableProps) => {
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

            <TableHead className="text-gray-400 font-semibold">Setor</TableHead>
            <TableHead className="text-gray-400 font-semibold">Mês</TableHead>
            <TableHead className="text-gray-400 font-semibold">Ano</TableHead>
            <TableHead className="text-gray-400 font-semibold text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-300 py-8">
                Nenhuma despesa encontrada.
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
                <TableCell className="flex items-center justify-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-teal-50 transition"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 text-gray-400 hover:text-teal-600 hover:cursor-pointer" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-50 transition"
                    title="Deletar"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600 hover:cursor-pointer" />
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
