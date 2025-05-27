import { NotFoundBox } from "@/common/components/not-found-box/NotFoundBox";
import { SecretaryDetailsCard } from "../secretary-details-card/SecretaryDetailsCard";

export interface Secretary {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface SecretariatsDetailsCardsTileProps {
  secretariatsListData: Secretary[];
  isPending: boolean;
}

export const SecretariatsDetailsCardsTile = ({
  secretariatsListData,
  isPending,
}: SecretariatsDetailsCardsTileProps) => {
  return (
    <div>
      {secretariatsListData.length <= 0 ? (
        <NotFoundBox
          title="Nenhuma Secretaria encontrada"
          description="Nenhuma secretaria encontrada. Tente criar a primeira"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secretariatsListData.map((secretary) => (
            <SecretaryDetailsCard key={secretary.id} secretary={secretary} />
          ))}
        </div>
      )}
    </div>
  );
};
