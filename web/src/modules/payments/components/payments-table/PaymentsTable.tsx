import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const PaymentsTable = () => {
  return (
    <div className="rounded-lg border border-gray-100 overflow-x-auto shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-white">
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
      </Table>
    </div>
  );
};
