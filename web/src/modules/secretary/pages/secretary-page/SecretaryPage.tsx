import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { Pagination } from "@/common/components/pagination/Pagination";
import { RefreshButton } from "@/common/components/refreshButton/RefreshButton";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SecretariatsDetailsCardsTile } from "../../components/secretariats-details-cards-tile/SecretariatsDetailsCardsTile";
import { useSecretaryPageController } from "./secretary-page-controller";
import { CreateButton } from "@/common/components/create-button/CreateButton";
import { CreateSecretaryPopup } from "../../components/create-secretary-popup/CreateSecretaryPopup";

export const SecretaryPage = () => {
  const {
    secretariatsListData,
    pagination,
    isPending,
    refetchSecretariatsList,
    page,
    handlePageChange,
    openCreatSecretaryPopup,
    setOpenCreatSecretaryPopup,
  } = useSecretaryPageController();
  return (
    <ContentWrapper>
      <div className="flex flex-row justify-between items-center mb-4">
        <ContentTitle label="Secreatrias" />
        <div className="flex flex-row gap-1 items-center">
          <CreateButton
            label="Cadastrar Secretaria"
            openPopup={() => setOpenCreatSecretaryPopup(true)}
          />
          <RefreshButton onClick={refetchSecretariatsList} />
        </div>
      </div>

      <div className="mt-4">
        <SecretariatsDetailsCardsTile
          isPending={isPending}
          secretariatsListData={secretariatsListData}
        />
        <CreateSecretaryPopup
          open={openCreatSecretaryPopup}
          onCloseCreateSecretaryPopup={() => setOpenCreatSecretaryPopup(false)}
          handleRefetchSecretaryListData={refetchSecretariatsList}
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
