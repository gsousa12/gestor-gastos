import { useState } from "react";
import {
  getCurrentMonth,
  getCurrentYear,
  getErrorMessage,
} from "@common/utils/functions";
import { getPaymentListQuery } from "@common/api/queries/payments/getPaymentListQuery";
import { showToast } from "@/common/components/toast/Toast";
import { cancelPaymentByIdMutation } from "@/common/api/mutations/payment/cancelPaymentByIdMutation";

export type PaymentsFilterValues = {
  supplierName: string;
  month: number | "";
  year: string;
};

export const usePaymentsPageController = () => {
  const [filters, setFilters] = useState<PaymentsFilterValues>({
    supplierName: "",
    month: getCurrentMonth(),
    year: getCurrentYear(),
  });
  const [page, setPage] = useState(1);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openPaymentDetailsPopup, setOpenPaymentDetailsPopup] = useState(false);
  const [selectedPaymentIdToCancel, setSelectedPaymentIdToCancel] = useState<
    number | null
  >(null);
  const [selectedPaymentIdToDetail, setSelectedPaymentIdToDetail] = useState<
    number | null
  >(null);

  const applyFilters = (newFilters: PaymentsFilterValues) => {
    setFilters(newFilters);
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      supplierName: "",
      month: getCurrentMonth(),
      year: getCurrentYear(),
    });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCloseDeletePopup = () => {
    setOpenDeletePopup(false);
  };

  const onCancelPaymentById = (paymentId: number) => {
    setSelectedPaymentIdToCancel(paymentId);
    setOpenDeletePopup(true);
  };

  const {
    data: paymentListData,
    isFetching,
    refetch: refreshPaymentsList,
  } = getPaymentListQuery({
    page: page,
    supplierName: filters.supplierName,
    month: filters.month === "" ? undefined : filters.month,
    year: filters.year === "" ? getCurrentYear() : filters.year,
  });

  const { mutateAsync: cancelPaymentById } = cancelPaymentByIdMutation();

  const handleCancelPayment = async () => {
    if (selectedPaymentIdToCancel === null) return;
    try {
      await cancelPaymentById({ id: selectedPaymentIdToCancel });
      setOpenDeletePopup(false);
      setSelectedPaymentIdToCancel(null);
      refreshPaymentsList();
      showToast({
        title: "Pagamento Cancelado!",
        description: `Pagamento cancelado com sucesso.`,
        type: "success",
      });
    } catch (error) {
      setOpenDeletePopup(false);
      setSelectedPaymentIdToCancel(null);
      refreshPaymentsList();
      showToast({
        title: "Erro ao cancelar pagamento",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  const handleOpenPaymentDetails = (paymentId: number) => {
    setSelectedPaymentIdToDetail(paymentId);
    setOpenPaymentDetailsPopup(true);
  };

  const handleClosePaymentDetailsPopup = () => {
    setOpenPaymentDetailsPopup(false);
  };

  return {
    paymentListData: paymentListData?.data ?? [],
    pagination: paymentListData?.pagination,
    page,
    filters,
    applyFilters,
    clearFilters,
    handlePageChange,
    isPending: isFetching,
    refreshPaymentsList,
    onCancelPaymentById,
    openDeletePopup,
    handleCloseDeletePopup,
    handleCancelPayment,
    handleOpenPaymentDetails,
    selectedPaymentIdToDetail,
    handleClosePaymentDetailsPopup,
    openPaymentDetailsPopup,
  };
};
