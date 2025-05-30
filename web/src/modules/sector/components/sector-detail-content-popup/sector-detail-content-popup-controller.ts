import { getSectorByIdQuery } from "@/common/api/queries/sector/getSectorByIdQuery";
import { Sector } from "../sectors-details-cards-tile/SectorsDetailsCardsTile";
import {
  getSubSectorListBySectorIdQuery,
  GetSubSectorListBySectorIdResponse,
} from "@/common/api/queries/sector/getSubSectorListBySectorIdQuery";

export const useSectorDetailsController = (selectedSectorId: number | null) => {
  const { data: SectorDetailsData } = getSectorByIdQuery({
    id: selectedSectorId!,
  });

  const { data: subSectorListData } = getSubSectorListBySectorIdQuery({
    id: selectedSectorId!,
  });

  return {
    SectorDetailsData: SectorDetailsData?.data ?? ({} as Sector),
    subSectorListData: subSectorListData?.data ?? [],
  };
};
