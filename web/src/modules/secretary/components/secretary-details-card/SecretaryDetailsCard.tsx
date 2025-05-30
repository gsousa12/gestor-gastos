import { Building } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Secretary } from "../secretariats-details-cards-tile/SecretariatsDetailsCardsTile";

interface SecretaryDetailsCardProps {
  secretary: Secretary;
}

export const SecretaryDetailsCard = ({
  secretary,
}: SecretaryDetailsCardProps) => {
  // const handleDetailsClick = () => {

  // };

  return (
    <Card
      className="relative p-4 bg-gradient-to-br from-white via-slate-50 to-sky-50 hover:shadow-lg border 
    border-gray-200 shadow-sm shadow-gray-300 rounded-md group min-h-[70px] flex flex-col gap-3 w-full"
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between px-0">
        <CardTitle
          className="text-sky-600 text-base flex items-center gap-2 truncate"
          title={secretary.name}
        >
          <Building className="w-4 h-4 text-sky-500" />
          <span>{secretary.name}</span>
        </CardTitle>
        {/* <button
          onClick={() => {}}
          className="p-1 rounded hover:bg-sky-50 transition-colors"
          aria-label="Ver detalhes"
        >
          <Eye className="w-5 h-5 text-sky-500 hover:cursor-pointer" />
        </button> */}
      </CardHeader>
    </Card>
  );
};
