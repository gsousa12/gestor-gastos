import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { useSupplierDetailsPageController } from "./supplier-details-page-controller";
import { ContentTitle } from "@/common/components/content-title/ContentTitle";
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
  History,
} from "lucide-react";
import {
  convertCentsToReal,
  formatDateAndHoursToPTBR,
  formatTaxId,
  getCurrentMonth,
  getMonthName,
} from "@/common/utils/functions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import { InfoRow } from "../../components/supplier-info-row/SupplierInfoRow";
import { StatCard } from "../../components/supplier-stat-card/SupplierStatCard";
import { TimelineItem } from "../../components/supplier-timeline-item/SupplierTimelineItem";
import { SupplierPaymentHistoryChart } from "../../components/supplier-payment-history-chart/SupplierPaymentHistoryChart";
import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import { cn } from "@/common/lib/utils";

export const SupplierDetailsPage = () => {
  const { supplierDetailsData, isSuccess } = useSupplierDetailsPageController();
  const isMobile = useMobileDetect();

  if (!isSuccess || !supplierDetailsData) return null;

  const {
    supplierInformation,
    financialSummary,
    recentExpenses,
    paymentHistory,
  } = supplierDetailsData;

  const chartData = financialSummary.paymentHistoryByMonth.map((item) => ({
    month: getMonthName(item.month).slice(0, 3), // Ex: "Mai"
    totalPaid: item.totalPaid / 100,
  }));

  return (
    <ContentWrapper>
      <ContentTitle label="Detalhes do Fornecedor" />

      <Card className="border-gray-200 shadow-sm mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sky-600 text-lg">
            <Truck className="w-5 h-5" />
            {supplierInformation.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <InfoRow
            icon={Landmark}
            label="Razão Social"
            value={supplierInformation.companyName}
            isMobile={isMobile}
          />
          <InfoRow
            icon={FileText}
            label="CNPJ/CPF"
            value={
              supplierInformation.taxId
                ? formatTaxId(supplierInformation.taxId)
                : null
            }
            isMobile={isMobile}
          />
          <InfoRow
            icon={Mail}
            label="E-mail"
            value={supplierInformation.contactEmail}
            isMobile={isMobile}
          />
          <InfoRow
            icon={Phone}
            label="Telefone"
            value={supplierInformation.contactPhone}
            isMobile={isMobile}
          />
          <InfoRow
            icon={DollarSign}
            label="Débito Recorrente"
            value={`R$ ${convertCentsToReal(
              supplierInformation.recurringDebit
            )}`}
            isMobile={isMobile}
          />
          <InfoRow
            icon={Calendar}
            label="Criado em"
            value={formatDateAndHoursToPTBR(supplierInformation.createdAt)}
            isMobile={isMobile}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="financeiro" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger
            value="financeiro"
            className={`hover:cursor-pointer ${
              isMobile ? "text-[9.2px]" : "text-[14px]"
            }`}
          >
            Financeiro
          </TabsTrigger>
          <TabsTrigger
            value="despesas"
            className={`hover:cursor-pointer ${
              isMobile ? "text-[9.2px]" : "text-[14px]"
            }`}
          >
            Últimas Despesas
          </TabsTrigger>
          <TabsTrigger
            value="pagamentos"
            className={`hover:cursor-pointer ${
              isMobile ? "text-[9.2px]" : "text-[14px] w-[25rem]"
            }`}
          >
            Pagamentos Recentes
          </TabsTrigger>
        </TabsList>

        {/* TAB FINANCEIRO */}
        <TabsContent value="financeiro">
          <div className="flex gap-4 mb-4">
            <StatCard
              icon={TrendingUp}
              label={`Pago em ${getMonthName(getCurrentMonth())}`}
              value={`R$ ${convertCentsToReal(
                financialSummary.totalPaidThisMonth
              )}`}
              isMobile={isMobile}
            />
            <StatCard
              icon={FileText}
              label="Despesas Pendentes"
              value={`R$ ${convertCentsToReal(
                financialSummary.totalPendingExpenses
              )}`}
              isMobile={isMobile}
            />
          </div>
          <SupplierPaymentHistoryChart
            chartData={chartData}
            isMobile={isMobile}
          />
        </TabsContent>

        {/* TAB DESPESAS */}
        <TabsContent value="despesas">
          <Card className="border-gray-200 shadow-sm">
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
        </TabsContent>

        {/* TAB PAGAMENTOS */}
        <TabsContent value="pagamentos">
          <Card className="border-gray-200 shadow-sm">
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
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
};
