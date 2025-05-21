import { getSupplierListQuery } from "@/common/api/queries/supplier/getSupplierListQuery";

export const useSuppliersPageController = () => {
  const { data: supplierListData, isFetching } = getSupplierListQuery({
    page: 1,
    name: "",
    has_debits: "",
  });

  return {
    supplierListData: supplierListData?.data ?? [],
    isPending: isFetching,
  };
};
