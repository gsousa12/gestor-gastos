import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Check, X } from "lucide-react";
import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import { cn } from "@/common/lib/utils";
import type { GetSubSectorListBySectorIdResponse } from "@/common/api/queries/sector/getSubSectorListBySectorIdQuery";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Input } from "@/common/components/ui/input";
import { useSubSectorListController } from "./sub-sector-list-contoller";
import { showToast } from "@/common/components/toast/Toast";
import { getErrorMessage } from "@/common/utils/functions";

interface SubSectorListProps {
  subSectorListData: GetSubSectorListBySectorIdResponse[];
  selectedSectorId: number | null;
  handleRefetchSubSectorListData: () => void;
}

const addSubSectorSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, { message: "O nome deve ter entre 3 e 20 caracteres." })
    .max(20, { message: "O nome deve ter entre 3 e 20 caracteres." }),
});

type AddSubSectorForm = z.infer<typeof addSubSectorSchema>;

export const SubSectorList = ({
  subSectorListData,
  selectedSectorId,
  handleRefetchSubSectorListData,
}: SubSectorListProps) => {
  const { createSubSectorMutate, softDeleteSubSectorByIdMutate } =
    useSubSectorListController();
  const isMobile = useMobileDetect();
  const [addPopoverOpen, setAddPopoverOpen] = useState(false);
  const [deletePopoverId, setDeletePopoverId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddSubSectorForm>({
    resolver: zodResolver(addSubSectorSchema),
    defaultValues: { name: "" },
  });

  const onCreateSubSector = async (data: AddSubSectorForm) => {
    if (!selectedSectorId) {
      return;
    }
    try {
      await createSubSectorMutate({
        name: data.name,
        sectorId: selectedSectorId,
      });
      handleRefetchSubSectorListData();
      setAddPopoverOpen(false);
      reset();
      showToast({
        title: "Sub-setor adicionado com sucesso!",
        description: `O sub-setor "${data.name}" foi criado.`,
        type: "success",
      });
    } catch (error) {
      handleRefetchSubSectorListData();
      setAddPopoverOpen(false);
      reset();
      showToast({
        title: "Erro ao adicionar sub-setor",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  const onDeleteSubSector = async (subSectorId: number) => {
    try {
      await softDeleteSubSectorByIdMutate({
        id: subSectorId,
      });
      handleRefetchSubSectorListData();
      setDeletePopoverId(null);
      showToast({
        title: "Sub-setor excluído com sucesso!",
        description: "O sub-setor foi removido.",
        type: "success",
      });
    } catch (error) {
      handleRefetchSubSectorListData();
      setDeletePopoverId(null);
      showToast({
        title: "Erro ao excluir sub-setor",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sky-700">Sub-setores</div>
        <Popover open={addPopoverOpen} onOpenChange={setAddPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="p-1 rounded hover:bg-sky-100 hover:cursor-pointer transition-colors text-sky-600"
              aria-label="Adicionar sub-setor"
            >
              <Plus className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className={cn(
              "bg-white border border-gray-200 rounded-md shadow-lg p-3 w-64",
              "animate-in fade-in-0 zoom-in-95"
            )}
            sideOffset={8}
          >
            <form
              onSubmit={handleSubmit(onCreateSubSector)}
              className="flex flex-col gap-2"
              autoComplete="off"
            >
              <Input
                {...register("name")}
                placeholder="Nome do sub-setor"
                className={cn(
                  "border-sky-300 focus:border-sky-500",
                  errors.name && "border-red-400"
                )}
                autoFocus
                maxLength={20}
              />
              <div
                className={cn(
                  "min-h-[18px] text-xs text-red-500 transition-all",
                  errors.name ? "opacity-100" : "opacity-0"
                )}
              >
                {errors.name?.message || " "}
              </div>
              <div className="flex items-center justify-end gap-2 mt-1">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-100 hover:cursor-pointer transition-colors text-gray-500"
                  aria-label="Cancelar"
                  onClick={() => {
                    setAddPopoverOpen(false);
                    reset();
                  }}
                  tabIndex={0}
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className={cn(
                    "p-1 rounded hover:bg-sky-100 hover:cursor-pointer transition-colors text-sky-600",
                    isSubmitting && "opacity-60 pointer-events-none"
                  )}
                  aria-label="Confirmar"
                  tabIndex={0}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <div
        className={cn(
          "flex flex-col gap-2",
          "max-h-48 overflow-y-auto pr-1",
          isMobile && "max-h-36"
        )}
      >
        {subSectorListData.length === 0 ? (
          <div className="text-gray-400 italic">
            Nenhum sub-setor encontrado.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {subSectorListData.map((sub) => (
              <li
                key={sub.id}
                className="flex items-center justify-between border-b border-gray-100 last:border-b-0 pb-2 last:pb-0"
              >
                <span className="text-gray-700">{sub.name}</span>
                <Popover
                  open={deletePopoverId === sub.id}
                  onOpenChange={(open) =>
                    setDeletePopoverId(open ? sub.id : null)
                  }
                >
                  <PopoverTrigger asChild>
                    <button
                      className="p-1 rounded hover:bg-sky-50 hover:cursor-pointer transition-colors"
                      aria-label="Excluir"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className={cn(
                      "bg-white border border-gray-200 rounded-md shadow-lg p-2 w-24 flex items-center justify-end gap-2",
                      "animate-in fade-in-0 zoom-in-95"
                    )}
                    sideOffset={8}
                  >
                    <button
                      className="p-1 rounded hover:bg-gray-100 hover:cursor-pointer transition-colors text-gray-500"
                      aria-label="Cancelar"
                      onClick={() => setDeletePopoverId(null)}
                      tabIndex={0}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-sky-100 hover:cursor-pointer transition-colors text-sky-600"
                      aria-label="Confirmar"
                      onClick={() => onDeleteSubSector(sub.id)}
                      tabIndex={0}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </PopoverContent>
                </Popover>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
