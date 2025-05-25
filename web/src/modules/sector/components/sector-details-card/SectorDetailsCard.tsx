import { Info, Layers2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Sector } from "../sectors-details-cards-tile/SectorsDetailsCardsTile";

interface SectorDetailsCardProps {
  sector: Sector;
}

export const SectorDetailsCard = ({ sector }: SectorDetailsCardProps) => {
  const handleDetailsClick = () => {
    alert(`Detalhes do setor: ${sector.name}`);
  };

  return (
    <Card
      className="relative p-4 bg-gradient-to-br from-white via-slate-50 to-sky-50 hover:shadow-lg border 
      border-gray-200 shadow-sm shadow-gray-300 rounded-md group min-h-[120px] flex flex-col gap-3 w-full"
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between px-0">
        <CardTitle className="text-sky-600 text-base flex items-center gap-2">
          <Layers2 className="w-4 h-4 text-sky-400" />
          <span className="truncate">{sector.name}</span>
        </CardTitle>
        <button
          onClick={handleDetailsClick}
          className="p-1 rounded hover:bg-sky-50 transition-colors"
          aria-label="Ver detalhes"
        >
          <div className="flex flex-row gap-1 hover:cursor-pointer">
            <Plus className="w-5 h-5 text-sky-500 " />
            <span className="text-[11px] text-sky-500 self-center">
              Sub-setores
            </span>
          </div>
        </button>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 flex flex-col gap-2 px-0">
        {/* <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-400" />
          <span className="text-gray-500">Criado em:</span>
          <span className="truncate">
            {formatDateAndHoursToPTBR(sector.createdAt)}
          </span>
        </div> */}
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          <span className="text-gray-500">Descrição:</span>
          <span className="truncate" title={sector.description ?? ""}>
            {sector.description ? (
              sector.description
            ) : (
              <span className="italic text-gray-400">Não informado</span>
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
