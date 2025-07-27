import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { convertCentsToReal, formatNumber } from "@/common/utils/functions"; // Supondo que você tenha um formatNumber

// ==================================================================
// MUDANÇA 1: A interface de props agora reflete a nova estrutura de dados da API.
// - 'unitValue' foi removido.
// - 'totalValue' e 'unitOfMeasure' foram adicionados.
// ==================================================================
interface ExpenseItemsTableProps {
  items: {
    itemId: number;
    quantity: number;
    totalValue: number; // O valor total do item (em centavos)
    unitOfMeasure: string; // A unidade de medida (ex: "un", "kg")
    item: { name: string; description: string | null };
  }[];
}

export const ExpenseItemsTable = ({ items }: ExpenseItemsTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-sky-100 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {/* ================================================================== */}
            {/* MUDANÇA 2: O cabeçalho da tabela foi atualizado. */}
            {/* - "Valor unit." foi substituído por "Medida". */}
            {/* ================================================================== */}
            <TableHead className="min-w-[160px]">Item</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-center">Qtd.</TableHead>
            <TableHead className="text-center">Medida</TableHead>
            <TableHead className="text-right">Valor Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ================================================================== */}
          {/* MUDANÇA 3: A lógica de renderização foi completamente atualizada. */}
          {/* ================================================================== */}
          {items.map(
            ({ itemId, quantity, totalValue, unitOfMeasure, item }) => {
              // O cálculo do total não é mais necessário, pois a API já nos envia o 'totalValue'.
              // const total = quantity * unitValue; // <-- LÓGICA ANTIGA REMOVIDA

              return (
                <TableRow key={itemId}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description ?? "-"}</TableCell>
                  {/* Exibe a quantidade, formatada para o padrão brasileiro */}
                  <TableCell className="text-center">
                    {formatNumber(quantity)}
                  </TableCell>
                  {/* Exibe a nova unidade de medida */}
                  <TableCell className="text-center">{unitOfMeasure}</TableCell>
                  {/* Exibe o valor total do item, já vindo da API */}
                  <TableCell className="text-right font-semibold">
                    {convertCentsToReal(totalValue)}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
};
