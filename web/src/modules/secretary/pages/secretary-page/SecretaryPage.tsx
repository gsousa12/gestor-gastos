import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { Pagination } from "@/common/components/pagination/Pagination";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SecretariatsDetailsCardsTile } from "../../components/secretariats-details-cards-tile/SecretariatsDetailsCardsTile";
import { useSecretaryPageController } from "./secretary-page-controller";

export const SecretaryPage = () => {
  const {
    secretariatsListData,
    pagination,
    isPending,
    refetchSecretariatsList,
    page,
    handlePageChange,
  } = useSecretaryPageController();
  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Secretarias" />
        <RefreshButton onClick={refetchSecretariatsList} />
      </div>

      <div className="mt-4">
        <SecretariatsDetailsCardsTile
          isPending={isPending}
          secretariatsListData={secretariatsListData}
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
