import { softDeleteSupplierByIdMutation } from "@/common/api/mutations/supplier/softDeleteSupplierByIdMutation";
import { getSupplierListQuery } from "@/common/api/queries/supplier/getSupplierListQuery";
import { showToast } from "@/common/components/toast/Toast";
import { getErrorMessage } from "@/common/utils/functions";
import { useEffect, useState } from "react";

export const useSuppliersPageController = () => {
  const [page, setPage] = useState(1);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(
    null
  );
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

  const onSoftDeleteSupplier = (supplierId: number) => {
    setSelectedIdToDelete(supplierId);
    setOpenDeletePopup(true);
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

  const { mutate: softDeleteSupplierById } = softDeleteSupplierByIdMutation();

  const handleSoftDeleteSupplier = () => {
    if (selectedIdToDelete) {
      softDeleteSupplierById(
        { id: selectedIdToDelete },
        {
          onError: (error) => {
            showToast({
              title: "Erro ao desativar fornecedor!",
              description: getErrorMessage(error),
              type: "error",
            });
          },
          onSuccess: () => {
            setOpenDeletePopup(false);
            setSelectedIdToDelete(null);
            refreshSupplierList();
            showToast({
              title: "Fornecedor Desativado!",
              description: `Fornecedor desativado com sucesso.`,
              type: "success",
            });
          },
        }
      );
    }
  };

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
    onSoftDeleteSupplier,
    openDeletePopup,
    selectedIdToDelete,
    setOpenDeletePopup,
    handleSoftDeleteSupplier,
  };
};
