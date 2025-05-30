import { SupplierDetailsResponse } from "@/common/api/interfaces/supplier/supplier-api-interfaces";
import { getSupplierByIdQuery } from "@/common/api/queries/supplier/getSupplierByIdQuery";
import { showToast } from "@/common/components/toast/Toast";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSupplierDetailsPageController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const supplierId = location?.state?.supplierId;

  const {
    data,
    isError,
    isFetching,
    isSuccess,
    refetch: refretchSupplierDetails,
  } = getSupplierByIdQuery({
    id: supplierId,
  });

  useEffect(() => {
    if (!supplierId) {
      showToast({
        title: "Erro ao acessar detalhes do fornecedor",
        description: "Fornecedor não encontrado.",
        type: "error",
      });
      navigate("/dashboard", { replace: true });
    }
  }, [supplierId, navigate]);

  return {
    supplierDetailsData: data?.data ?? ({} as SupplierDetailsResponse),
    isError,
    isFetching,
    isSuccess,
    refretchSupplierDetails,
  };
};
