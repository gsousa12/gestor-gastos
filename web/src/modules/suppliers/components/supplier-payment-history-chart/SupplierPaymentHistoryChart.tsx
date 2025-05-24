import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/common/components/ui/chart";
import { cn } from "@/common/lib/utils";
import { History } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface SupplierPaymentHistoryChartProps {
  chartData: any;
  isMobile: boolean;
}

export const SupplierPaymentHistoryChart = ({
  chartData,
  isMobile,
}: SupplierPaymentHistoryChartProps) => {
  const chartConfig = {
    totalPaid: {
      label: "Total Pago",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card
      className={cn(
        "border-gray-200 shadow-sm",
        isMobile ? "w-[100%]" : "w-[50%]"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-600 flex items-center gap-1">
          {isMobile ? <></> : <History className="w-4 h-4 text-sky-500" />}
          Valores pagos ao fornecedor nos últimos 6 meses
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {chartData.length > 0 ? (
          <div className="w-[180px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                width={220}
                height={180}
                barCategoryGap={8}
              >
                <CartesianGrid vertical={false} strokeDasharray="2 2" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={false}
                  style={{ fontSize: 15 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  wrapperStyle={{
                    fontSize: 20,
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                  }}
                  formatter={(value) =>
                    `R$ ${Number(value).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`
                  }
                />
                <Bar
                  dataKey="totalPaid"
                  fill="var(--color-totalPaid)"
                  radius={2}
                  barSize={30}
                />
              </BarChart>
            </ChartContainer>
          </div>
        ) : (
          <span className="italic text-gray-400 text-xs">
            Sem pagamentos atrelados.
          </span>
        )}
      </CardContent>
    </Card>
  );
};
