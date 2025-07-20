import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  BadgeDollarSign,
  Building2,
  Calendar,
  FileText,
  Info,
  Receipt,
  Truck,
  User,
} from "lucide-react";
import {
  convertCentsToReal,
  formatDateAndHoursToPTBR,
  getMonthName,
} from "@/common/utils/functions";
import { StatusBadge } from "@/common/components/badges/status-badge/StatusBadge";
import { Avatar } from "@/common/components/avatar/Avatar";

interface ExpenseSummaryCardsProps {
  data: any; // expenseDetailsData
}

const statusVariant = (status: string) =>
  status === "pago"
    ? "positive"
    : status === "pendente"
    ? "negative"
    : "neutral";

export const ExpenseSummaryCards = ({ data }: ExpenseSummaryCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* DESPESA */}
      <Card className="bg-white shadow-sm border-sky-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sky-700">
            <Receipt className="w-5 h-5" />
            Despesa
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Descrição:</span>
            <span>{data.description || "-"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Competência:</span>
            <span>
              {getMonthName(data.month)} / {data.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BadgeDollarSign className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Valor Total:</span>
            <span className="font-semibold">
              R$ {convertCentsToReal(data.amount)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Status:</span>
            <StatusBadge
              text={data.status}
              variant={statusVariant(data.status)}
              className="w-fit mt-1 capitalize"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Criado em:</span>
            <span>{formatDateAndHoursToPTBR(data.createdAt)}</span>
          </div>
        </CardContent>
      </Card>

      {/* FORNECEDOR */}
      <Card className="bg-white shadow-sm border-sky-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sky-700">
            <Truck className="w-5 h-5" />
            Fornecedor
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Nome:</span>
            <span>{data.supplier?.name ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Razão Social:</span>
            <span>{data.supplier?.companyName ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">
              Débito Recorrente:
            </span>
            <span>
              {data.supplier?.recurringDebit !== undefined
                ? `R$ ${convertCentsToReal(data.supplier.recurringDebit)}`
                : "-"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* VÍNCULOS */}
      <Card className="bg-white shadow-sm border-sky-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sky-700">
            <Building2 className="w-5 h-5" />
            Vínculos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Secretaria:</span>
            <span>{data.secretary?.name ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-gray-700">Subsetor:</span>
            <span>{data.subsector?.name ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar name={data.user?.name || "Usuário"} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">
                Despesa cadastrada por:
              </span>
              <span className="text-sm">{data.user?.name ?? "-"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
