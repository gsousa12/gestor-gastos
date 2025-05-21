import { Badge } from "@/common/components/ui/badge";

export const TimelineItem = ({
  title,
  subtitle,
  amount,
  status,
  icon: Icon,
  date,
}: any) => (
  <div className="flex items-center justify-between py-2 text-sm">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-sky-500" />
      <div>
        <div className="font-medium text-gray-700">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-semibold text-gray-800">R$ {amount}</div>
      <div className="text-xs text-gray-400">{date}</div>
      {status && (
        <Badge
          variant={
            status === "pago" || status === "ativo" ? "default" : "outline"
          }
          className="mt-1"
        >
          {status}
        </Badge>
      )}
    </div>
  </div>
);
