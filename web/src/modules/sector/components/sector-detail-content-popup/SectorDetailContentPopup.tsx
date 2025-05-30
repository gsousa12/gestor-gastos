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

  const { SectorDetailsData, subSectorListData } =
    useSectorDetailsController(selectedSectorId);

  console.log("SectorDetailsData", SectorDetailsData);
  console.log("subSectorListData", subSectorListData);
  return (
    <div
      className={`flex flex-col gap-6 px-2 ${
        isMobile ? "text-base" : "text-sm"
      }`}
    >
      <SectorDetailsInfo sectorDetails={SectorDetailsData} />
      <SubSectorList subSectorListData={subSectorListData} />
    </div>
  );
};
