import { SectorDetailsInfo } from "../sector-details-info/SectorDetailsInfo";
import { SubSectorList } from "../sub-sector-list/SubSectorList";

interface SectorDetailContentPopupProps {
  sectorDetails: any;
  subSectorListData: any[];
  isMobile: boolean;
}

export const SectorDetailContentPopup = ({
  sectorDetails,
  subSectorListData,
  isMobile,
}: SectorDetailContentPopupProps) => {
  return (
    <div
      className={`flex flex-col gap-6 px-2 py-2 ${
        isMobile ? "text-base" : "text-sm"
      }`}
    >
      <SectorDetailsInfo sectorDetails={sectorDetails} />
      <SubSectorList subSectorListData={subSectorListData} />
    </div>
  );
};
