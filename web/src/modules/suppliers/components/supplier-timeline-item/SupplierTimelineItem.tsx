import { StatusBadge } from "@/common/components/badges/status-badge/StatusBadge";
import { Badge } from "@/common/components/ui/badge";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  amount: string;
  status?: string;
  icon: any;
  date: string;
  isMobile?: boolean;
}

export const TimelineItem = ({
  title,
  subtitle,
  amount,
  status,
  icon: Icon,
  date,
  isMobile,
}: TimelineItemProps) => (
  <div className="flex items-center justify-between gap-4 rounded-xl bg-white dark:bg-muted px-4 py-3 shadow-sm hover:shadow-md transition">
    <div className="flex items-start gap-3">
      <div className="mt-1">
        <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          <span className="mr-2">{title}</span>
          {status && (
            <div className="inline-block capitalize">
              <StatusBadge text={status}>{status}</StatusBadge>
            </div>
          )}
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {subtitle ?? "-"}
        </span>
      </div>
    </div>

    <div className="text-right space-y-0.5">
      <div className="text-sm font-bold text-gray-900 dark:text-white">
        R$ {amount}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>
    </div>
  </div>
);
