import { getSectorListQuery } from "@/common/api/queries/sector/getSectorListQuery";
import { useState } from "react";

export const useSectorPageController = () => {
  const [page, setPage] = useState(1);
  const [openSectorDetailPopup, setOpenSectorDetailPopup] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState<number | null>(null);
  const [openCreateSectorPopup, setOpenCreateSectorPopup] =
    useState<boolean>(false);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleOpenSubSectorList = (sectorId: number) => {
    setSelectedSectorId(sectorId);
    setOpenSectorDetailPopup(true);
  };

  const handleCloseSectorDetailPopup = () => {
    setOpenSectorDetailPopup(false);
    setSelectedSectorId(null);
  };

  const {
    data: sectorListData,
    isPending,
    refetch: refetchSectorList,
  } = getSectorListQuery({
    page,
  });

  return {
    sectorListData: sectorListData?.data ?? [],
    pagination: sectorListData?.pagination,
    isPending,
    refetchSectorList,
    page,
    handlePageChange,
    // popup controls
    openSectorDetailPopup,
    handleOpenSubSectorList,
    handleCloseSectorDetailPopup,
    selectedSectorId,
    setSelectedSectorId,
    openCreateSectorPopup,
    setOpenCreateSectorPopup,
  };
};
