import { Card, CardContent } from "@/common/components/ui/card";

interface StatCardProps {
  icon: any;
  label: string;
  value?: string | number | null;
  isMobile: boolean;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  isMobile,
}: StatCardProps) => (
  <Card className="flex-1 border-gray-200 shadow-sm">
    <CardContent className="flex items-center gap-2 py-3">
      {isMobile ? <></> : <Icon className="w-4 h-4 text-sky-500" />}
      <div className={isMobile ? "flex flex-col" : ""}>
        <div
          className={`text-xs text-gray-500 ${isMobile ? "text-[10px]" : ""}`}
        >
          {label}
        </div>
        <div
          className={`text-base font-semibold text-gray-800 ${
            isMobile ? "text-[12px]" : ""
          }`}
        >
          {value}
        </div>
      </div>
    </CardContent>
  </Card>
);
