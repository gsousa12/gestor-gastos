import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { CreateButton } from "@/common/components/create-button/CreateButton";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SectorsDetailsCardsTile } from "../../components/sectors-details-cards-tile/SectorsDetailsCardsTile";
import { useSectorPageController } from "./sector-page-controller";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { Pagination } from "@/common/components/pagination/Pagination";
import { SectorDetailPopup } from "../../components/sector-detail-popup/SectorDetailPopup";
import { CreateSectorPopup } from "../../components/create-sector-popup/CreateSectorPopup";

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
    selectedSectorId,
    openCreateSectorPopup,
    setOpenCreateSectorPopup,
  } = useSectorPageController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Setores" />
        <div className="flex flex-row gap-1 items-center">
          <CreateButton
            label="Cadastrar Setor"
            openPopup={() => setOpenCreateSectorPopup(true)}
          />
          <RefreshButton onClick={refetchSectorList} />
        </div>
      </div>
      <SectorsDetailsCardsTile
        sectorListData={sectorListData}
        isPending={isPending}
        onOpenSubSectorList={handleOpenSubSectorList}
      />

      <CreateSectorPopup
        open={openCreateSectorPopup}
        onCloseCreateSectorPopup={() => setOpenCreateSectorPopup(false)}
        handleRefetchSectorListData={refetchSectorList}
      />

      <SectorDetailPopup
        open={openSectorDetailPopup}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseSectorDetailPopup();
          }
        }}
        selectedSectorId={selectedSectorId}
      />

      <Pagination
        currentPage={page}
        totalPages={pagination?.totalPages ?? 1}
        totalItems={pagination?.totalItems ?? 0}
        onPageChange={handlePageChange}
      />
    </ContentWrapper>
  );
};
