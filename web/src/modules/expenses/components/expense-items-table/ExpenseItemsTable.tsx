import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/components/ui/table";
import { convertCentsToReal } from "@/common/utils/functions";

interface ExpenseItemsTableProps {
  items: {
    itemId: number;
    quantity: number;
    unitValue: number;
    item: { name: string; description: string | null };
  }[];
}

export const ExpenseItemsTable = ({ items }: ExpenseItemsTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[160px]">Item</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Valor unit.</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map(({ itemId, quantity, unitValue, item }) => {
            const total = quantity * unitValue;
            return (
              <TableRow key={itemId}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description ?? "-"}</TableCell>
                <TableCell className="text-right">{quantity}</TableCell>
                <TableCell className="text-right">
                  R$ {convertCentsToReal(unitValue)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  R$ {convertCentsToReal(total)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
