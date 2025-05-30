import { getSectorByIdQuery } from "@/common/api/queries/sector/getSectorByIdQuery";
import { Sector } from "../sectors-details-cards-tile/SectorsDetailsCardsTile";
import { getSubSectorListBySectorIdQuery } from "@/common/api/queries/sector/getSubSectorListBySectorIdQuery";

export const useSectorDetailsController = (selectedSectorId: number | null) => {
  const { data: sectorDetailsData } = getSectorByIdQuery(
    { id: selectedSectorId! },
    { enabled: selectedSectorId !== null }
  );

  const { data: subSectorListData, refetch: refetchSubSectorListData } =
    getSubSectorListBySectorIdQuery(
      { id: selectedSectorId! },
      { enabled: selectedSectorId !== null }
    );

  const handleRefetchSubSectorListData = () => {
    refetchSubSectorListData();
  };

  return {
    sectorDetailsData: sectorDetailsData?.data ?? ({} as Sector),
    subSectorListData: subSectorListData?.data ?? [],
    handleRefetchSubSectorListData,
  };
};
