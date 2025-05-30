import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, FileText, Plus } from "lucide-react";
import { cn } from "@/common/lib/utils";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { showToast } from "@/common/components/toast/Toast";
import { getErrorMessage } from "@/common/utils/functions";
import {
  createSectorDefaultValues,
  CreateSectorFormValues,
  createSectorSchema,
} from "./schema";
import { useCreateSectorController } from "./create-sector-controller";

interface CreateSectorPopupContentProps {
  handleRefetchSectorListData: () => void;
}

export const CreateSectorPopupContent = ({
  handleRefetchSectorListData,
}: CreateSectorPopupContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateSectorFormValues>({
    resolver: zodResolver(createSectorSchema),
    defaultValues: createSectorDefaultValues,
  });

  const { createSectorMutate } = useCreateSectorController();

  const onSubmit = async (data: CreateSectorFormValues) => {
    try {
      await createSectorMutate({
        name: data.name.trim(),
        description: data.description?.trim() || null,
      });
      handleRefetchSectorListData();
      reset();
      showToast({
        title: "Setor cadastrado com sucesso!",
        description: `Setor "${data.name}" foi adicionado.`,
        type: "success",
      });
    } catch (error) {
      handleRefetchSectorListData();
      reset();
      showToast({
        title: "Erro ao cadastrar setor",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full py-2"
      autoComplete="off"
    >
      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <Building2 className="w-4 h-4" />
          Nome*
        </label>
        <Input
          {...register("name")}
          placeholder="Nome do setor"
          className={cn(
            "border-sky-300 focus:border-sky-500",
            errors.name && "border-red-400"
          )}
        />
        <div
          className={cn(
            "min-h-[18px] text-xs text-red-500 transition-all",
            errors.name ? "opacity-100" : "opacity-0"
          )}
        >
          {errors.name?.message || " "}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <FileText className="w-4 h-4" />
          Descrição
        </label>
        <Input
          {...register("description")}
          placeholder="Descrição do setor (opcional)"
          className={cn(
            "border-sky-300 focus:border-sky-500",
            errors.description && "border-red-400"
          )}
        />
        <div
          className={cn(
            "min-h-[18px] text-xs text-red-500 transition-all",
            errors.description ? "opacity-100" : "opacity-0"
          )}
        >
          {errors.description?.message || " "}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center gap-2 mt-2 cursor-pointer"
        disabled={isSubmitting}
      >
        <Plus className="w-4 h-4" />
        Cadastrar setor
      </Button>
    </form>
  );
};
