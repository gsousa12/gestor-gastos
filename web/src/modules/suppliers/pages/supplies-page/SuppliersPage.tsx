import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SuppliersDetailsCardsTile } from "../../components/suppliers-details-cards-tile/SuppliersDetailsCardsTile";
import { Pagination } from "@/common/components/pagination/Pagination";
import { useSuppliersPageController } from "./suppliers-page-controller";

export const SuppliersPage = () => {
  const { supplierListData, isPending } = useSuppliersPageController();

  return (
    <ContentWrapper>
      <ContentTitle label="Fornecedores" />
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
