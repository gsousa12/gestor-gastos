import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SuppliersDetailsCardsTile } from "../../components/suppliers-details-cards-tile/SuppliersDetailsCardsTile";
import { Pagination } from "@/common/components/pagination/Pagination";
import { useSuppliersPageController } from "./suppliers-page-controller";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { CreateButton } from "@/common/components/create-button/CreateButton";
import { CreateSupplierPopup } from "../../components/create-supplier-popup/CreateSupplierPopup";
import { ConfirmationPopup } from "@/common/components/popups/confirmation-popup/ConfirmationPopup";

export const SuppliersPage = () => {
  const {
    supplierListData,
    pagination,
    isPending,
    refreshSupplierList,
    page,
    handlePageChange,
    handleOpenCreateSupplierPopup,
    openCreateSupplierPopup,
    handleCloseCreateSupplierPopUp,
    onSoftDeleteSupplier,
    openDeletePopup,
    setOpenDeletePopup,
    handleSoftDeleteSupplier,
  } = useSuppliersPageController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Fornecedores" />
        <div className="flex flex-row gap-1 items-center">
          <CreateButton
            label="Cadastrar Fornecedor"
            openPopup={handleOpenCreateSupplierPopup}
          />
          <RefreshButton onClick={refreshSupplierList} />
        </div>
      </div>
      <div className="mt-4">
        <SuppliersDetailsCardsTile
          supplierListData={supplierListData}
          isPending={isPending}
          onSoftDeleteSupplier={onSoftDeleteSupplier}
        />

        <CreateSupplierPopup
          open={openCreateSupplierPopup}
          handleCloseCreateSupplierPopUp={handleCloseCreateSupplierPopUp}
          refreshSupplierList={refreshSupplierList}
        />
        <ConfirmationPopup
          open={openDeletePopup}
          title="Excluir Fornecedor"
          description="Tem certeza que deseja excluir essa fornecedor? Essa ação irá desativar o fornecedor do sistema."
          onCancel={() => setOpenDeletePopup(false)}
          onConfirm={handleSoftDeleteSupplier}
        />
        <Pagination
          currentPage={page}
          totalPages={pagination?.totalPages ?? 1}
          totalItems={pagination?.totalItems ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </ContentWrapper>
  );
};
