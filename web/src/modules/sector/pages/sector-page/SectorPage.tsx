import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { CreateButton } from "@/common/components/create-button/CreateButton";
import { GenerateReportButton } from "@/common/components/generate-report-button/GenerateReportButton";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { getCurrentMonth, getCurrentYear } from "@/common/utils/functions";
import { SectorsDetailsCardsTile } from "../../components/sectors-details-cards-tile/SectorsDetailsCardsTile";
import { useSectorPageController } from "./sector-page-controller";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { Pagination } from "@/common/components/pagination/Pagination";
import { SectorDetailPopup } from "../../components/sector-detail-popup/SectorDetailPopup";

export const SectorPage = () => {
  const {
    sectorListData,
    pagination,
    refetchSectorList,
    isPending,
    page,
    handlePageChange,
    openSectorDetailPopup,
    handleOpenSubSectorList,
    handleCloseSectorDetailPopup,
    sectorDetails,
    subSectorListData,
    isMobile,
  } = useSectorPageController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Setores" />
        <div className="flex flex-row gap-1 items-center">
          <CreateButton label="Cadastrar Setor" openPopup={() => {}} />
          <GenerateReportButton
            type="sectors"
            month={getCurrentMonth()}
            year={getCurrentYear()}
          />
          <RefreshButton onClick={refetchSectorList} />
        </div>
      </div>
      <SectorsDetailsCardsTile
        sectorListData={sectorListData}
        isPending={isPending}
        onOpenSubSectorList={handleOpenSubSectorList}
      />
      <Pagination
        currentPage={page}
        totalPages={pagination?.totalPages ?? 1}
        totalItems={pagination?.totalItems ?? 0}
        onPageChange={handlePageChange}
      />
      <SectorDetailPopup
        open={openSectorDetailPopup}
        onOpenChange={(open) => {
          if (!open) handleCloseSectorDetailPopup();
        }}
        sectorDetails={sectorDetails}
        subSectorListData={subSectorListData}
        isMobile={isMobile}
      />
    </ContentWrapper>
  );
};
