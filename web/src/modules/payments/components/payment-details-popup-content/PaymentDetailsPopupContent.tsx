import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import {
  BadgeDollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  User,
  Building2,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import { usePaymentDetailsController } from "./payment-details-popup-content-controller";
import {
  convertCentsToReal,
  formatDateAndHoursToPTBR,
  getMonthName,
} from "@/common/utils/functions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";

interface PaymentDetailsPopupContentProps {
  selectedId: number | null;
}

export const PaymentDetailsPopupContent = ({
  selectedId,
}: PaymentDetailsPopupContentProps) => {
  const isMobile = useMobileDetect();
  const { paymentDetailsData } = usePaymentDetailsController(selectedId);

  // Helper para exibir valores ou "-"
  const showValue = (value: any) =>
    value === null || value === undefined || value === "" ? "-" : value;

  // recurringDebitDeducted custom
  const renderRecurringDebitDeducted = () => {
    if (
      paymentDetailsData?.recurringDebitDeducted === null ||
      paymentDetailsData?.recurringDebitDeducted === undefined
    )
      return "-";

    const value = convertCentsToReal(paymentDetailsData.recurringDebitDeducted);
    if (paymentDetailsData.recurringDebitDeductedType === "incremento") {
      return (
        <span className="flex items-center gap-1 text-red-600 font-medium">
          <TrendingUp className="w-4 h-4" />
          +R$ {value}{" "}
          <span className="text-[9px] font-extrabold text-gray-800">
            (aumento do débito com fornecedor)
          </span>
        </span>
      );
    }
    if (paymentDetailsData.recurringDebitDeductedType === "dedução") {
      return (
        <span className="flex items-center gap-1 text-green-600 font-medium">
          <TrendingDown className="w-4 h-4" />
          -R$ {value}{" "}
          <span className="text-[9px] font-extrabold text-gray-800">
            (redução do débito com fornecedor)
          </span>
        </span>
      );
    }
    return value;
  };

  if (!paymentDetailsData) {
    return (
      <div className="flex items-center justify-center min-h-[120px] text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <Tabs defaultValue="pagamento" className="w-full">
      <TabsList
        className={isMobile ? "w-full grid grid-cols-3" : "w-full flex"}
      >
        <TabsTrigger value="pagamento" className="w-full hover:cursor-pointer">
          Pagamento
        </TabsTrigger>
        <TabsTrigger value="fornecedor" className="w-full hover:cursor-pointer">
          Fornecedor
        </TabsTrigger>
        <TabsTrigger value="despesa" className="w-full hover:cursor-pointer">
          Despesa
        </TabsTrigger>
      </TabsList>

      {/* DADOS DO PAGAMENTO */}
      <TabsContent value="pagamento">
        <Card className="bg-white shadow-sm border-sky-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-700">
              <BadgeDollarSign className="w-5 h-5" />
              Dados do Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Mês:</span>
              <span>{showValue(getMonthName(paymentDetailsData.month))}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Ano:</span>
              <span>{showValue(paymentDetailsData.year)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Valor:</span>
              <span>
                {paymentDetailsData.amount !== null &&
                paymentDetailsData.amount !== undefined
                  ? `R$ ${convertCentsToReal(paymentDetailsData.amount)}`
                  : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Status:</span>
              <span className="capitalize">
                {showValue(paymentDetailsData.status)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">
                Débito Recorrente:
              </span>
              {renderRecurringDebitDeducted()}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Criado em:</span>
              <span>
                {paymentDetailsData.createdAt
                  ? formatDateAndHoursToPTBR(paymentDetailsData.createdAt)
                  : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Cancelado em:</span>
              <span>
                {paymentDetailsData.cancelledAt
                  ? formatDateAndHoursToPTBR(paymentDetailsData.cancelledAt)
                  : "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* FORNECEDOR */}
      <TabsContent value="fornecedor">
        <Card className="bg-white shadow-sm border-sky-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-700">
              <User className="w-5 h-5" />
              Fornecedor
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Nome:</span>
              <span>{showValue(paymentDetailsData.supplier?.name)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Razão Social:</span>
              <span>{showValue(paymentDetailsData.supplier?.companyName)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">
                Débito Recorrente:
              </span>
              <span>
                {paymentDetailsData.supplier?.recurringDebit !== null &&
                paymentDetailsData.supplier?.recurringDebit !== undefined
                  ? `R$ ${convertCentsToReal(
                      paymentDetailsData.supplier.recurringDebit
                    )}`
                  : "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* DESPESA */}
      <TabsContent value="despesa">
        <Card className="bg-white shadow-sm border-sky-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-700">
              <FileText className="w-5 h-5" />
              Despesa
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Descrição:</span>
              <span>{showValue(paymentDetailsData.expense?.description)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Valor:</span>
              <span>
                {paymentDetailsData.expense?.amount !== null &&
                paymentDetailsData.expense?.amount !== undefined
                  ? `R$ ${convertCentsToReal(
                      paymentDetailsData.expense.amount
                    )}`
                  : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="font-medium text-gray-700">Status:</span>
              <span className="capitalize">
                {showValue(paymentDetailsData.expense?.status)}
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
