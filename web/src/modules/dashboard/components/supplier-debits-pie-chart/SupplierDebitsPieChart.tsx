import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "../../../../components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { convertCentsToReal } from "../../../../common/utils/functions";

interface SupplierDebitData {
  id: number;
  name: string;
  recurringDebit: number;
}

interface SupplierDebitsPieChartProps {
  supplierDebitData: SupplierDebitData[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function SupplierDebitsPieChart({
  supplierDebitData,
}: SupplierDebitsPieChartProps) {
  const chartData = React.useMemo(() => {
    return supplierDebitData
      .sort((a, b) => b.recurringDebit - a.recurringDebit)
      .slice(0, 5)
      .map((item, idx) => ({
        ...item,
        fill: COLORS[idx % COLORS.length],
      }));
  }, [supplierDebitData]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      recurringDebit: { label: "Débito em aberto" },
    };
    chartData.forEach((item, idx) => {
      config[item.name] = {
        label: item.name,
        color: COLORS[idx % COLORS.length],
      };
    });
    return config;
  }, [chartData]);

  const totalDebit = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.recurringDebit, 0),
    [chartData]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base">
          Fornecedores com maiores débitos em aberto
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { name, recurringDebit } = payload[0].payload;
                  return (
                    <div className="rounded bg-white px-3 py-2 shadow text-xs text-gray-700">
                      <div className="font-semibold">{name}</div>
                      <div>R$ {convertCentsToReal(recurringDebit)}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey="recurringDebit"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {convertCentsToReal(totalDebit)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Total em aberto
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex flex-col gap-1 text-xs">
          {chartData.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: COLORS[idx % COLORS.length] }}
              />
              <span className="truncate">{item.name}</span>
              <span className="ml-auto font-semibold text-gray-700">
                R$ {convertCentsToReal(item.recurringDebit)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
