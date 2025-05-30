import { formatDateAndHoursToPTBR } from "@/common/utils/functions";
import { Calendar, Info } from "lucide-react";

interface SectorDetailsInfoProps {
  sectorDetails: any;
}

export const SectorDetailsInfo = ({
  sectorDetails,
}: SectorDetailsInfoProps) => {
  if (!sectorDetails) return null;

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sky-700 font-semibold text-lg">
        <Info className="w-5 h-5 text-sky-500" />
        {sectorDetails.name}
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <span className="font-medium">Descrição:</span>
        <span>
          {sectorDetails.description ? (
            sectorDetails.description
          ) : (
            <span className="italic text-gray-400">Não informado</span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Calendar className="w-4 h-4 text-sky-400" />
        <span>
          Criado em: {formatDateAndHoursToPTBR(sectorDetails.createdAt)}
        </span>
      </div>
    </div>
  );
};
