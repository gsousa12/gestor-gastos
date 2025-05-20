import { Skeleton } from "@ui/skeleton";

export const SupplierDetailsCardSkeleton = () => (
  <div className="relative p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white via-slate-50 to-gray-50 border border-gray-100 min-h-[240px]  flex flex-col gap-4">
    <Skeleton className="absolute top-3 right-3 w-6 h-6 rounded-full" />
    <Skeleton className="w-2/3 h-5 rounded mb-2" />
    <Skeleton className="w-1/2 h-4 rounded mb-4" />
    <Skeleton className="w-1/3 h-6 rounded mb-2" />
    <Skeleton className="w-1/2 h-4 rounded mb-2" />

    <Skeleton className="w-1/2 h-4 rounded" />
  </div>
);
