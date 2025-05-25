import { NotFoundItems } from "@/common/components/not-found-items/NotFoundItems";
import { SectorDetailsCard } from "../sector-details-card/SectorDetailsCard";
import { NotFoundBox } from "@/common/components/not-found-box/NotFoundBox";

export type Sector = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
};

interface SuppliersDetailsCardsTileProps {
  sectorListData: Sector[];
  isPending: boolean;
}

export const SectorsDetailsCardsTile = ({
  sectorListData,
  isPending,
}: SuppliersDetailsCardsTileProps) => {
  return (
    <div>
      {sectorListData.length <= 0 && !isPending ? (
        <NotFoundBox
          title="Nenhum Setor Encontrado"
          description="Nenhumo setor foi encontrada. Crie o primeiro."
        />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {sectorListData.map((sector) => (
            <SectorDetailsCard key={sector.id} sector={sector} />
          ))}
        </div>
      )}
    </div>
  );
};
