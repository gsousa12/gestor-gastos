import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import { SuppliersDetailsCardsTile } from "../../components/suppliers-details-cards-tile/SuppliersDetailsCardsTile";

export const SuppliersPage = () => {
  //   const {} = useSuppliersPageController();

  return (
    <ContentWrapper>
      <ContentTitle label="Fornecedores" />
      <div className="mt-6">
        <SuppliersDetailsCardsTile />
      </div>
    </ContentWrapper>
  );
};
