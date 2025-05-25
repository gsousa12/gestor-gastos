import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SuppliersDetailsCardsTile } from "../../components/suppliers-details-cards-tile/SuppliersDetailsCardsTile";
import { Pagination } from "@/common/components/pagination/Pagination";
import { useSuppliersPageController } from "./suppliers-page-controller";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";

export const SuppliersPage = () => {
  const { supplierListData, isPending, refreshSupplierList } =
    useSuppliersPageController();

  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Fornecedores" />
        <RefreshButton onClick={refreshSupplierList} />
      </div>
      <div className="mt-4">
        <SuppliersDetailsCardsTile
          supplierListData={supplierListData}
          isPending={isPending}
        />
        <Pagination
          currentPage={1}
          totalPages={1}
          totalItems={0}
          onPageChange={() => {}}
        />
      </div>
    </ContentWrapper>
  );
};
