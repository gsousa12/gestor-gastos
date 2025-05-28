import { getSupplierListQuery } from "@/common/api/queries/supplier/getSupplierListQuery";
import { useState } from "react";

export const useSuppliersPageController = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const [openCreateSupplierPopup, setOpenCreateSupplierPopup] =
    useState<boolean>(false);

  const handleOpenCreateSupplierPopup = () => {
    setOpenCreateSupplierPopup(true);
  };
  const handleCloseCreateSupplierPopUp = () => {
    setOpenCreateSupplierPopup(false);
  };

  const {
    data: supplierListData,
    isFetching,
    refetch: refreshSupplierList,
  } = getSupplierListQuery({
    page: page,
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
    handleOpenCreateSupplierPopup,
    openCreateSupplierPopup,
    handleCloseCreateSupplierPopUp,
  };
};
