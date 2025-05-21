import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { useSupplierDetailsPageController } from "./supplier-details-page-controller";
import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { cn } from "@/common/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Truck,
  Calendar,
  DollarSign,
  FileText,
  Landmark,
  Mail,
  Phone,
  TrendingUp,
} from "lucide-react";
import { History as HistoryIcon } from "lucide-react";
import {
  convertCentsToReal,
  formatDateAndHoursToPTBR,
  getMonthName,
} from "@/common/utils/functions";
import { Separator } from "@/common/components/ui/separator";
import { Badge } from "@/common/components/ui/badge";

// COMPONENTES REUTILIZÁVEIS

const InfoRow = ({ icon: Icon, label, value, className }: any) => (
  <div className={cn("flex items-center gap-2 text-gray-500", className)}>
    <Icon className="w-4 h-4 text-sky-500" />
    <span className="font-medium">{label}:</span>
    <span className="text-gray-700">
      {value ? (
        `R$ ${value}`
      ) : (
        <span className="italic text-gray-400">Não informado</span>
      )}
    </span>
  </div>
);

const SectionTitle = ({ icon: Icon, children }: any) => (
  <div className="flex items-center gap-2 mb-2">
    <Icon className="w-5 h-5 text-sky-500" />
    <h2 className="text-lg font-semibold text-sky-600">{children}</h2>
  </div>
);

const StatCard = ({ icon: Icon, label, value, className }: any) => (
  <Card className={cn("flex-1 border-gray-200", className)}>
    <CardContent className="flex items-center gap-3 py-4">
      <Icon className="w-7 h-7 text-sky-500" />
      <div>
        <div className="text-gray-500 text-xs">{label}</div>
        <div className="text-lg font-bold text-gray-800">{value}</div>
      </div>
    </CardContent>
  </Card>
);

const TimelineItem = ({
  title,
  subtitle,
  amount,
  status,
  icon: Icon,
  date,
}: any) => (
  <div className="flex items-center gap-3 py-2">
    <div className="rounded-full bg-sky-50 p-2 border border-sky-100">
      <Icon className="w-5 h-5 text-sky-500" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-700">{title}</span>
        {status && (
          <Badge
            variant={
              status === "pago" || status === "ativo" ? "default" : "outline"
            }
            className={
              status === "pago" || status === "ativo"
                ? "bg-sky-100 text-sky-700 border-sky-200"
                : "border-gray-300 text-gray-500"
            }
          >
            {status}
          </Badge>
        )}
      </div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
    <div className="text-right">
      <div className="font-semibold text-gray-800">{`R$ ${amount}`}</div>
      <div className="text-xs text-gray-400">{date}</div>
    </div>
  </div>
);

export const SupplierDetailsPage = () => {
  const { supplierDetailsData, isSuccess } = useSupplierDetailsPageController();

  if (!isSuccess || !supplierDetailsData) return null;

  const {
    supplierInformation,
    financialSummary,
    recentExpenses,
    paymentHistory,
  } = supplierDetailsData;

  return (
    <ContentWrapper>
      <ContentTitle label="Detalhes do Fornecedor" />

      {/* INFORMAÇÕES DO FORNECEDOR */}
      <Card className="mb-6 border-gray-200 mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sky-600">
            <Truck className="w-5 h-5" />
            {supplierInformation.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow
            icon={Landmark}
            label="Razão Social"
            value={supplierInformation.companyName}
          />
          <InfoRow
            icon={FileText}
            label="CNPJ/CPF"
            value={supplierInformation.taxId}
          />
          <InfoRow
            icon={Mail}
            label="E-mail"
            value={supplierInformation.contactEmail}
          />
          <InfoRow
            icon={Phone}
            label="Telefone"
            value={supplierInformation.contactPhone}
          />
          <InfoRow
            icon={DollarSign}
            label="Débito Recorrente"
            value={convertCentsToReal(supplierInformation.recurringDebit)}
          />
          <InfoRow
            icon={Calendar}
            label="Criado em"
            value={formatDateAndHoursToPTBR(supplierInformation.createdAt)}
          />
        </CardContent>
      </Card>

      {/* RESUMO FINANCEIRO */}
      <SectionTitle icon={DollarSign}>Resumo Financeiro</SectionTitle>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <StatCard
          icon={TrendingUp}
          label="Total Pago no Mês"
          value={`R$ ${convertCentsToReal(
            financialSummary.totalPaidThisMonth
          )}`}
        />
        <StatCard
          icon={FileText}
          label="Despesas Pendentes"
          value={`R$ ${convertCentsToReal(
            financialSummary.totalPendingExpenses
          )}`}
        />
      </div>
      <div className="mb-8">
        <SectionTitle icon={HistoryIcon}>
          Total pago ao fornecedor nos últimos 6 meses
        </SectionTitle>
        <div className="flex flex-wrap gap-3">
          {financialSummary.paymentHistoryByMonth.map((item) => (
            <div
              key={`${item.month}-${item.year}`}
              className="rounded-lg border border-gray-200 px-4 py-2 bg-white flex flex-col items-center min-w-[100px] transition-shadow hover:shadow-md"
            >
              <span className="text-xs text-gray-400">
                {getMonthName(item.month)}/{item.year}
              </span>
              <span className="font-semibold text-gray-700">
                R$ {convertCentsToReal(item.totalPaid)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* ÚLTIMAS DESPESAS */}
      <SectionTitle icon={FileText}>Últimas Despesas</SectionTitle>
      <Card className="mb-8 border-gray-200">
        <CardContent className="divide-y divide-gray-100">
          {recentExpenses.length === 0 && (
            <div className="text-gray-400 py-4 text-center">
              Nenhuma despesa encontrada.
            </div>
          )}
          {recentExpenses.map((expense) => (
            <TimelineItem
              key={expense.id}
              icon={FileText}
              title={expense.description || "Sem descrição"}
              subtitle={`${getMonthName(expense.month)}/${expense.year}`}
              amount={convertCentsToReal(expense.amount)}
              status={expense.status}
              date={formatDateAndHoursToPTBR(expense.createdAt)}
            />
          ))}
        </CardContent>
      </Card>

      {/* HISTÓRICO DE PAGAMENTOS */}
      <SectionTitle icon={DollarSign}>Pagamentos Recentes</SectionTitle>
      <Card className="mb-8 border-gray-200">
        <CardContent className="divide-y divide-gray-100">
          {paymentHistory.length === 0 && (
            <div className="text-gray-400 py-4 text-center">
              Nenhum pagamento encontrado.
            </div>
          )}
          {paymentHistory.map((payment) => (
            <TimelineItem
              key={payment.id}
              icon={DollarSign}
              title={`Pagamento Nº ${payment.id}`}
              subtitle={`${getMonthName(payment.month)}/${payment.year}`}
              amount={convertCentsToReal(payment.amount)}
              status={payment.status}
              date={formatDateAndHoursToPTBR(payment.createdAt)}
            />
          ))}
        </CardContent>
      </Card>
    </ContentWrapper>
  );
};
