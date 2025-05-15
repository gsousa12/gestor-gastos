import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export const PaymentsTable = () => {
  return (
    <div className="rounded-lg border border-gray-100 overflow-x-auto shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-white"></TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
