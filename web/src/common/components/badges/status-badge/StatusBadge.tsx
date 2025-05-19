import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        positive:
          "bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        negative:
          "bg-orange-200 text-orange-800 dark:bg-orange-900/30 dark:orange-red-400",
        neutral:
          "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  text: string;
  icon?: React.ReactNode;
}

export const StatusBadge = ({
  className,
  variant,
  text,
  icon,
  ...props
}: StatusBadgeProps) => {
  return (
    <div className={cn(statusBadgeVariants({ variant, className }))} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </div>
  );
};
