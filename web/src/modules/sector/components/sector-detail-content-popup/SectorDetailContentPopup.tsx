import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import { SectorDetailsInfo } from "../sector-details-info/SectorDetailsInfo";
import { SubSectorList } from "../sub-sector-list/SubSectorList";
import { useSectorDetailsController } from "./sector-detail-content-popup-controller";

interface SectorDetailContentPopupProps {
  selectedSectorId: number | null;
}

export const SectorDetailContentPopup = ({
  selectedSectorId,
}: SectorDetailContentPopupProps) => {
  const isMobile = useMobileDetect();

  const {
    sectorDetailsData,
    subSectorListData,
    handleRefetchSubSectorListData,
  } = useSectorDetailsController(selectedSectorId);

  return (
    <div
      className={`flex flex-col gap-6  ${isMobile ? "text-base" : "text-sm"}`}
    >
      <SectorDetailsInfo sectorDetails={sectorDetailsData} />
      <SubSectorList
        subSectorListData={subSectorListData}
        selectedSectorId={selectedSectorId}
        handleRefetchSubSectorListData={handleRefetchSubSectorListData}
      />
    </div>
  );
};
