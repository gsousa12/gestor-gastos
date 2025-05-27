import { getSectorListQuery } from "@/common/api/queries/sector/getSectorListQuery";
import { Pagination } from "@/common/components/pagination/Pagination";
import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import { useState } from "react";

// Mocks
export const sectorDetailsMock = {
  name: "Esportes",
  description: null,
  createdAt: "2025-05-25T15:54:49.938Z",
  updatedAt: null,
};

export const subSectorListDataMock = [
  { id: 1, name: "Esportes" },
  { id: 2, name: "teste 2" },
];

export const useSectorPageController = () => {
  const [page, setPage] = useState(1);
  const [openSectorDetailPopup, setOpenSectorDetailPopup] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState<number | null>(null);

  const isMobile = useMobileDetect();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Simule busca dos dados mockados
  const sectorDetails = selectedSectorId ? sectorDetailsMock : null;
  const subSectorListData = selectedSectorId ? subSectorListDataMock : [];

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
    sectorDetails,
    subSectorListData,
    isMobile,
  };
};
