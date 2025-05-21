import { Skeleton } from "../../ui/skeleton";

export const ExpenseTableSkeleton = () => {
  return (
    <div className="space-y-3">
      {" "}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-7 gap-34 items-center py-3 border-b"
        >
          <Skeleton className="h-4 w-[174px]" />
          <Skeleton className="h-4 w-[125px]" />
          <Skeleton className="h-4 w-[136px]" />
          <Skeleton className="h-4 w-[122px] mr-10" />
          <Skeleton className="h-4 w-[93px]" />
          <Skeleton className="h-6 w-[103px] rounded-full" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      ))}
    </div>
  );
};
