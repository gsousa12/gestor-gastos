import { Pencil, Trash2 } from "lucide-react";

interface SubSectorListProps {
  subSectorListData: any[];
}

export const SubSectorList = ({ subSectorListData }: SubSectorListProps) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white">
      <div className="font-semibold text-sky-700 mb-2">Sub-setores</div>
      {subSectorListData.length === 0 ? (
        <div className="text-gray-400 italic">Nenhum sub-setor encontrado.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {subSectorListData.map((sub) => (
            <li
              key={sub.id}
              className="flex items-center justify-between border-b border-gray-100 last:border-b-0 pb-2 last:pb-0"
            >
              <span className="text-gray-700">{sub.name}</span>
              <div className="flex gap-2">
                {/* <button
                  className="p-1 rounded hover:bg-sky-50 transition-colors"
                  aria-label="Editar"
                  onClick={() => {}}
                >
                  <Pencil className="w-4 h-4 text-sky-500" />
                </button> */}
                <button
                  className="p-1 rounded hover:bg-sky-50 hover:cursor-pointer transition-colors"
                  aria-label="Excluir"
                  onClick={() => {}}
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
