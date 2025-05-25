import { getSectorListQuery } from "@/common/api/queries/sector/getSectorListQuery";
import { Pagination } from "@/common/components/pagination/Pagination";

export const useSectorPageController = () => {
  const {
    data: sectorListData,
    isPending,
    refetch: refetchSectorList,
  } = getSectorListQuery({
    page: 1,
  });

  return {
    sectorListData: sectorListData?.data ?? [],
    pagination: sectorListData?.pagination,
    isPending,
    refetchSectorList,
  };
};
