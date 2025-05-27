import { getSecretariatsListQuery } from "@/common/api/queries/secretary/getSecretariatsListQuery";
import { useState } from "react";

export const useSecretaryPageController = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const {
    data: secretariatsListData,
    isPending,
    refetch: refetchSecretariatsList,
  } = getSecretariatsListQuery({
    page: 1,
  });

  return {
    secretariatsListData: secretariatsListData?.data ?? [],
    pagination: secretariatsListData?.pagination,
    isPending,
    refetchSecretariatsList,
    page,
    handlePageChange,
  };
};
