import { cn } from "@/common/lib/utils";

interface InfoRowProps {
  icon: any;
  label: string;
  value?: string | number | null;
  isMobile: boolean;
}

export const InfoRow = ({
  icon: Icon,
  label,
  value,
  isMobile,
}: InfoRowProps) => (
  <div className="flex items-center gap-1 text-sm text-gray-600">
    {isMobile ? <></> : <Icon className="w-4 h-4 text-sky-500" />}
    <div className={isMobile ? "flex flex-col" : ""}>
      <span className={cn("font-medium", isMobile ? "text-[11px]" : "")}>
        {label}:
      </span>
      <span className={cn("text-gray-700", isMobile ? "text-[11px]" : "")}>
        {value ? (
          ` ${value}`
        ) : isMobile ? (
          "-"
        ) : (
          <span className="italic text-gray-400"> Não informado</span>
        )}
      </span>
    </div>
  </div>
);
