import { useState } from "react";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { getPaymentListQuery } from "@common/api/queries/payments/getPaymentListQuery";

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

  const {
    data: paymentListData,
    isPending,
    isFetching,
  } = getPaymentListQuery({
    page: page,
    supplierName: filters.supplierName,
    month: filters.month === "" ? undefined : filters.month,
    year: filters.year === "" ? getCurrentYear() : filters.year,
  });

  return {
    paymentListData: paymentListData?.data ?? [],
    pagination: paymentListData?.pagination,
    page,
    filters,
    applyFilters,
    clearFilters,
    handlePageChange,
    isPending: isFetching,
  };
};
