import { getSupplierListQuery } from "@/common/api/queries/supplier/getSupplierListQuery";
import { useState } from "react";

export const useSuppliersPageController = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const {
    data: supplierListData,
    isFetching,
    refetch: refreshSupplierList,
  } = getSupplierListQuery({
    page: 1,
    name: "",
    has_debits: "",
  });

  return {
    supplierListData: supplierListData?.data ?? [],
    pagination: supplierListData?.pagination,
    isPending: isFetching,
    refreshSupplierList,
    page,
    handlePageChange,
  };
};
