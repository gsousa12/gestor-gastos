import { SupplierDetailsCardSkeleton } from "@/common/components/skeletons/supplier-details-skeleton/SupplierDetailsCardSkeleton";
import { SupplierDetailsCard } from "../supplier-details-card/SupplierDetailsCard";
import { Supplier } from "@/common/api/interfaces/supplier/supplier-api-interfaces";

interface SuppliersDetailsCardsTileProps {
  supplierListData: Supplier[];
  isPending: boolean;
}

export const SuppliersDetailsCardsTile = ({
  supplierListData,
  isPending,
}: SuppliersDetailsCardsTileProps) => {
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <SupplierDetailsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {supplierListData.map((supplier) => (
        <SupplierDetailsCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
};
