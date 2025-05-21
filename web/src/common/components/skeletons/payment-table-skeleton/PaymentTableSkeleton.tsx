import { Skeleton } from "../../ui/skeleton";

export const PaymentTableSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-7 gap-30 items-center p-2 mr-2 border-b"
        >
          <Skeleton className="h-4 w-[120px]" />{" "}
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      ))}
    </div>
  );
};
